// Utility functions for date handling

/**
 * Converts DD-MM-YYYY format to YYYY-MM-DD for database storage
 */
export function convertToDbDate(date: string): string {
  if (!date || !date.includes("-")) return date;
  
  const parts = date.split("-");
  if (parts.length === 3 && parts[0]?.length === 2) {
    // DD-MM-YYYY format - convert to YYYY-MM-DD
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return date;
}

/**
 * Converts YYYY-MM-DD back to DD-MM-YYYY for display
 */
export function convertToDisplayDate(date: string): string {
  if (!date || !date.includes("-")) return date;
  
  const parts = date.split("-");
  if (parts.length === 3) {
    // YYYY-MM-DD format - convert to DD-MM-YYYY
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return date;
}
