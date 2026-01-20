"use server";

import { google } from "googleapis";
import { validateRequest } from "@/lib/auth";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { getGoogleSheetsAuth } from "@/lib/google-sheets";
import { ExpenseSchema, expenseSchema } from "./expense-schema";

export const addNewExpenseAction = async (data: ExpenseSchema) => {
  const now = new Date();
  const time = now.toLocaleString();
  const targetSheetName = now.getFullYear().toString();

  try {
    const parse = expenseSchema.safeParse(data);
    if (parse.error) {
      throw new BadRequestError();
    }

    const amount = parseFloat(data.amount);
    if (Number.isNaN(amount)) {
      throw new BadRequestError();
    }

    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    }

    const auth = getGoogleSheetsAuth([
      "https://www.googleapis.com/auth/spreadsheets",
    ]);
    const sheets = google.sheets({ auth, version: "v4" });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      throw new BadRequestError("Missing GOOGLE_SHEET_ID.");
    }

    const meta = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = meta.data.sheets?.some(
      (sheet) => sheet.properties?.title === targetSheetName
    );

    let sheetId = 0;
    if (!sheetExists) {
      const result = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: targetSheetName } } }],
        },
      });
      sheetId = result.data.replies?.[0].addSheet?.properties?.sheetId ?? 0;

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${targetSheetName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            ["Date", "Name", "Category", "Type", "Amount", "Description"],
          ],
        },
      });
    } else {
      const sheet = meta.data.sheets?.find(
        (sheet) => sheet.properties?.title === targetSheetName
      );
      sheetId = sheet?.properties?.sheetId ?? 0;
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${targetSheetName}!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            time,
            user.displayName,
            data.category,
            "EXPENSE",
            data.amount,
            data.description,
          ],
        ],
      },
    });

    return {
      data: {
        spreadsheetId,
        sheetId,
      },
    };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
