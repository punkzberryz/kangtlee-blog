# Plans

No active implementation plans.

## Completed

### Expense Dashboard From Google Sheets

The expense dashboard is implemented at `src/app/(secret)/admin/expense/`.
Because route groups do not affect the URL, the public path is `/admin/expense`.

Completed scope:

- Protected `/admin/expense` and the Google Sheets read helpers with the existing session auth strategy.
- Added year-aware Google Sheets reads, header validation, date normalization, and row filtering.
- Added dashboard summary cards, monthly spending chart, category breakdown, category details, purchase timeline, and monthly transactions table.
- Added empty and error states.
- Kept the existing transaction creation flow at `src/app/admin/(main)/expense/new/` unchanged.
- Updated chart/table layout so wide expense dashboard content scrolls inside its card on mobile instead of forcing page-level horizontal scroll.

Validation:

- `pnpm build` passes.
- Focused ESLint checks passed for changed expense/auth files.
- Full `pnpm lint` is still blocked by unrelated pre-existing React hook lint errors in the invoice generator and `use-is-mounted`.

Optional future enhancements should be tracked as new tasks when needed, such as tests, export/copy support, budgets, comparison views, merchant analysis, or reducing duplicate Google Sheets metadata calls.
