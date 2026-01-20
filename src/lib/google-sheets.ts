import { google } from "googleapis";

const SPREADSHEET_ID = "11pdEnI8NP9XQ-VBSYAQD0A3egej6zyT1km_Bc_AYiAo";
const SHEET_GID = 223705935;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

export type ExpenseRow = {
  date: string;
  name: string;
  category: string;
  type: string;
  amount: number;
  description: string;
};

const getPrivateKey = () => {
  if (process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64) {
    return Buffer.from(process.env.GOOGLE_SHEETS_PRIVATE_KEY_B64, "base64")
      .toString("utf8")
      .replace(/\\n/g, "\n");
  }

  if (process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    return process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n");
  }

  return null;
};

const getSheetsClient = () => {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets credentials.");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
};

export const fetchExpenseRows = async (): Promise<ExpenseRow[]> => {
  const sheets = getSheetsClient();

  const metadata = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
    fields: "sheets(properties(sheetId,title))",
  });

  const sheetTitle = metadata.data.sheets?.find(
    (sheet) => sheet.properties?.sheetId === SHEET_GID
  )?.properties?.title;

  if (!sheetTitle) {
    throw new Error("Google Sheets tab not found.");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetTitle}!A:F`,
  });

  const rows = response.data.values ?? [];
  const [, ...dataRows] = rows;

  return dataRows.map((row) => ({
    date: row[0] ?? "",
    name: row[1] ?? "",
    category: row[2] ?? "",
    type: row[3] ?? "",
    amount: Number(row[4] ?? 0),
    description: row[5] ?? "",
  }));
};
