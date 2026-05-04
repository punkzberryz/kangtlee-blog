# Plans

## Expense Dashboard From Google Sheets

### Current Status

The expense dashboard has been implemented at `src/app/(secret)/admin/expense/`.
Because route groups do not affect the URL, the public path is still `/admin/expense`.

The previous read-only page at `src/app/admin/(main)/expense/page.tsx` was removed to avoid a duplicate App Router path. The existing transaction creation flow at `src/app/admin/(main)/expense/new/` was left unchanged.

### Implemented

- Protected `/admin/expense` with the same session strategy used by the admin area.
- Protected Google Sheets read helpers so backend data fetches check auth before touching Sheets.
- Added `recharts` and a shadcn-compatible chart helper at `src/components/ui/chart.tsx`.
- Added year-aware Google Sheets reads:
  - find year-named sheet tabs such as `2025` and `2026`;
  - validate the expected header row;
  - normalize supported date formats to `yyyy-MM-dd`;
  - ignore invalid category, type, amount, and empty rows.
- Added dashboard summary cards:
  - total spending;
  - average transaction;
  - peak month;
  - top category.
- Added monthly spending bar chart.
- Added category breakdown as a donut/pie chart.
- Added category month selector, defaulting to whole year.
- Added reference-inspired category details:
  - selectable category table;
  - selected category metrics;
  - purchase timeline grouped by day, week, or month;
  - high/very-high purchase highlighting based on category-relative thresholds.
- Added monthly transaction table:
  - month selector;
  - global search;
  - per-column table header filters;
  - sortable headers;
  - no pagination, all matching rows are shown.
- Added empty and error states for the dashboard.

### Auth Strategy

The page calls `validateRequestOnServerComponent()` and redirects unauthenticated users to `/admin/signin`.

The Google Sheets read helpers also call `validateRequestOnServerComponent()` and throw `UnauthorizedError` before constructing a Sheets client or querying Google. This protects the data fetch path independently from the page-level route guard.

Protected helpers:

- `fetchAvailableExpenseYears()`
- `fetchExpenseRowsByYear()`
- legacy `fetchExpenseRows()`

### Data Contract

The Google Sheet expense tabs should use these columns:

- `Date`
- `Name`
- `Category`
- `Type`
- `Amount`
- `Description`

Current categories align with the existing expense form:

- `Food`
- `Grocery`
- `Healthcare`
- `Other`
- `Entertainment`
- `Utility`
- `Transport`
- `Education`
- `Housing`
- `Dada's Toys`
- `Shopping`

Parsing rules:

- Treat sheet tabs named with a 4-digit year as expense tabs.
- Default to the current year when no `year` query param is selected.
- Validate the header row before parsing data rows.
- Normalize supported date formats into `yyyy-MM-dd`.
- Ignore empty rows.
- Ignore rows with unknown categories.
- Ignore rows where `Type` is set and not `EXPENSE`.
- Ignore rows with missing, non-numeric, or non-positive amounts.

### File Map

```txt
src/app/(secret)/admin/expense/
  page.tsx
  _components/
    category-breakdown-chart.tsx
    category-breakdown-section.tsx
    category-details-table.tsx
    category-purchase-timeline.tsx
    expense-dashboard.tsx
    expense-empty-state.tsx
    expense-summary-cards.tsx
    monthly-spending-chart.tsx
    monthly-transactions-table.tsx
    year-selector.tsx
  _lib/
    expense-aggregations.ts

src/components/ui/chart.tsx
src/lib/google-sheets.ts
```

### Reference Project Usage

The implementation borrowed behavior from `/Users/teerasaklee/prj/tools/expense-tracker`, but translated it into Next.js App Router conventions.

Useful references:

- `src/data/google-sheets.ts`: Google Sheets auth, year-tab lookup, header validation, date normalization, and parsing.
- `src/routes/insights/monthly-summary/components/monthly-summary-data.ts`: monthly aggregation.
- `src/routes/insights/category-breakdown/components/category-breakdown-data.ts`: category and item-level aggregation.
- `src/routes/insights/category-breakdown/components/category-breakdown-table.tsx`: category details table behavior.
- `src/routes/insights/category-breakdown/components/category-breakdown-detail-chart.tsx`: purchase timeline grouping and highlighting.
- `src/routes/expense/components/expense-table.tsx`: table search/filter/header-filter behavior.

### Validation Notes

- `pnpm build` passes.
- Focused ESLint checks passed for the latest changed expense/auth files.
- Full `pnpm lint` is still blocked by pre-existing unrelated React hook lint errors in the invoice generator and `use-is-mounted`.
- `@tanstack/react-table` triggers the same React Compiler compatibility warning in the new transaction table that already exists in the repo's shared table component.

### Review Notes

- Route placement is intentional: `src/app/(secret)/admin/expense/page.tsx` resolves to `/admin/expense`, so the old `src/app/admin/(main)/expense/page.tsx` could not coexist.
- The dashboard passes parsed rows into client components for interactive charts/tables. This is acceptable after auth, but the route must remain dynamic and protected.
- `fetchAvailableExpenseYears()` and `fetchExpenseRowsByYear()` each perform their own auth check. This is slightly redundant when called together, but keeps each backend read helper independently safe.
- No automated tests are configured in this repo yet, so parsing and aggregation logic are covered only by build/type checks for now.

### Future Work

- Add focused tests for:
  - date normalization;
  - row parsing;
  - monthly aggregation;
  - category aggregation;
  - purchase timeline grouping/highlighting.
- Resolve the existing repo-wide lint blockers so `pnpm lint` can become a reliable final validation step.
- Add a better unauthenticated return path after `/admin/signin` if needed.
- Add transaction table export or copy support.
- Add budget targets and over/under indicators.
- Add month-over-month and year-over-year comparisons.
- Add merchant/name analysis.
- Consider reducing duplicate Google Sheets metadata calls by combining year-list and selected-year fetches into one helper.

### Closed Decisions

- Dashboard path: `/admin/expense`.
- Amount formatting: THB.
- Category breakdown default scope: whole selected year.
- Monthly transaction table default month: current month when viewing the current year; January otherwise.
- Route protection: use existing session auth via `validateRequestOnServerComponent()`.
