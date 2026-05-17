import type { RowData } from "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    /** When true, column uses minimal width (fits content) on full-width tables. */
    narrow?: boolean;
    /** Shown in column-visibility menu; falls back to column id if unset. */
    columnLabel?: string;
  }
}
