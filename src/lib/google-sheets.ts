import { google } from "googleapis";
import { validateRequestOnServerComponent } from "@/lib/auth";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";

const getSheetId = () => {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID.");
  }
  return sheetId;
};
const SHEET_GID = 223705935;
const READ_SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const EXPENSE_HEADERS = [
  "Date",
  "Name",
  "Category",
  "Type",
  "Amount",
  "Description",
] as const;
const EXPENSE_CATEGORIES = [
  "Food",
  "Grocery",
  "Healthcare",
  "Other",
  "Entertainment",
  "Utility",
  "Transport",
  "Education",
  "Housing",
  "Dada's Toys",
  "Shopping",
] as const;
const EXPENSE_CATEGORY_SET = new Set<string>(EXPENSE_CATEGORIES);

export type ExpenseRow = {
  date: string;
  name: string;
  category: string;
  type: string;
  amount: number;
  description: string;
};

export type ExpenseRowsQuery = {
  year?: string | number;
};

type SheetMetadata = {
  properties?: {
    title?: string | null;
  } | null;
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

export const getGoogleSheetsAuth = (scopes: string[] = READ_SCOPES) => {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  if (!clientEmail || !privateKey) {
    throw new Error("Missing Google Sheets credentials.");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes,
  });
};

const validateExpenseSheetReadAccess = async () => {
  const { user } = await validateRequestOnServerComponent();
  if (!user) {
    throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  }

  return user;
};

export const buildGoogleSheetUrl = (sheetId: string) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

const normalizeExpenseYear = (year?: string | number) => {
  if (year === undefined || year === null || year === "") {
    return new Date().getFullYear().toString();
  }

  const value = String(year).trim();
  if (!/^\d{4}$/.test(value)) {
    throw new Error("Year must be a 4-digit value.");
  }

  return value;
};

const isYearSheet = (value: string) => /^\d{4}$/.test(value);

const normalizeCell = (value: unknown) =>
  typeof value === "string" ? value.trim() : String(value ?? "").trim();

const parseExpenseDateCell = (value: unknown) => {
  const raw = normalizeCell(value);
  if (!raw) {
    return raw;
  }

  const withoutTime = raw.split(",")[0]?.trim() ?? raw;
  if (/^\d{4}-\d{2}-\d{2}$/.test(withoutTime)) {
    return withoutTime;
  }

  const slashDateMatch = withoutTime.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!slashDateMatch) {
    return withoutTime;
  }

  const [, month, day, year] = slashDateMatch;
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const parseExpenseHeaderRow = (row: unknown[]) => {
  const normalized = row.map(normalizeCell);
  const matches = EXPENSE_HEADERS.every(
    (header, index) => normalized[index] === header
  );

  if (!matches) {
    throw new Error(
      `Unexpected header row. Expected: ${EXPENSE_HEADERS.join(", ")}.`
    );
  }
};

const parseExpenseRow = (row: unknown[]): ExpenseRow | null => {
  const isEmpty = row.every((cell) => normalizeCell(cell).length === 0);
  if (isEmpty) {
    return null;
  }

  const category = normalizeCell(row[2]);
  const type = normalizeCell(row[3]);
  const amount = Number.parseFloat(normalizeCell(row[4]));

  if (!EXPENSE_CATEGORY_SET.has(category)) {
    return null;
  }

  if (type && type !== "EXPENSE") {
    return null;
  }

  if (Number.isNaN(amount) || amount <= 0) {
    return null;
  }

  return {
    date: parseExpenseDateCell(row[0]),
    name: normalizeCell(row[1]),
    category,
    type,
    amount,
    description: normalizeCell(row[5]),
  };
};

export const fetchAvailableExpenseYears = async (): Promise<string[]> => {
  await validateExpenseSheetReadAccess();

  const auth = getGoogleSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = getSheetId();
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: "sheets(properties(title))",
  });

  const titles = (metadata.data.sheets ?? [])
    .map((sheet: SheetMetadata) => sheet.properties?.title)
    .filter((title): title is string => typeof title === "string")
    .map((title) => title.trim())
    .filter(Boolean);

  return Array.from(new Set(titles.filter(isYearSheet))).sort(
    (a, b) => Number(b) - Number(a)
  );
};

export const fetchExpenseRowsByYear = async (
  query: ExpenseRowsQuery = {}
): Promise<{ rows: ExpenseRow[]; year: string; sheetUrl: string }> => {
  await validateExpenseSheetReadAccess();

  const year = normalizeExpenseYear(query.year);
  const auth = getGoogleSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });
  const sheetId = getSheetId();
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: "sheets(properties(title))",
  });

  const sheetExists = metadata.data.sheets?.some(
    (sheet) => sheet.properties?.title === year
  );
  if (!sheetExists) {
    throw new Error(`Google Sheets tab "${year}" not found.`);
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${year}!A:F`,
  });

  const sheetRows = response.data.values ?? [];
  if (sheetRows.length === 0) {
    return {
      rows: [],
      year,
      sheetUrl: buildGoogleSheetUrl(sheetId),
    };
  }

  const [headerRow, ...dataRows] = sheetRows;
  parseExpenseHeaderRow(headerRow ?? []);

  return {
    rows: dataRows
      .map((row) => parseExpenseRow(row ?? []))
      .filter((row): row is ExpenseRow => row !== null),
    year,
    sheetUrl: buildGoogleSheetUrl(sheetId),
  };
};

export const fetchExpenseRows = async (): Promise<ExpenseRow[]> => {
  await validateExpenseSheetReadAccess();

  const auth = getGoogleSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const sheetId = getSheetId();
  const metadata = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    fields: "sheets(properties(sheetId,title))",
  });

  const sheetTitle = metadata.data.sheets?.find(
    (sheet) => sheet.properties?.sheetId === SHEET_GID
  )?.properties?.title;

  if (!sheetTitle) {
    throw new Error("Google Sheets tab not found.");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
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
