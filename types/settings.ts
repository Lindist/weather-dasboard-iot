/**
 * Row shape for `public.settings` (ThingsBoard telemetry fields used by the app).
 * Align column names with your Supabase table; use snake_case here if the DB uses it.
 */
export interface SettingRow {
  id: string;
  entityType: string;
  entityId: string;
  keys: string;
  useStrictDataTypes: string;
}
