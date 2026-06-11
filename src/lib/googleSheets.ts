// =============================================================================
// Google Visualization API Connector
// =============================================================================

export interface SheetColumn {
  id?: string;
  label: string;
}

export interface SheetCell {
  v: string | number | null;
  f?: string;
}

export interface SheetRow {
  c: (SheetCell | null)[];
}

export interface SheetTable {
  cols: SheetColumn[];
  rows: SheetRow[];
}

/**
 * Fetches data from a Google Sheet tab using the Google Visualization API.
 * @param sheetId The ID of the Google Spreadsheet
 * @param gid The GID of the specific tab
 * @returns A 2D array of strings representing the sheet's rows and columns
 */
export async function fetchFromVisualizationAPI(sheetId: string, gid: string): Promise<string[][]> {
  if (!sheetId) {
    console.warn('No Google Sheet ID provided.');
    return [];
  }

  if (!gid && gid !== '0') {
    console.warn('No GID provided.');
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}&headers=1&t=${Date.now()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!response.ok) {
      console.error(`Failed to fetch sheet (GID: ${gid}): ${response.status}`);
      return [];
    }

    const text = await response.text();

    // Google Sheets returns JSONP-like response: google.visualization.Query.setResponse({...})
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(({[\s\S]*?})\)/);
    if (!jsonMatch) {
      console.error(`Failed to parse visualization response for sheet (GID: ${gid})`);
      return [];
    }

    const json = JSON.parse(jsonMatch[1]);
    const table: SheetTable = json.table;

    // The headers are in table.cols now because of headers=1
    const headers = table.cols.map((col) => col.label || col.id || '');

    // Extract all rows from the response
    const dataRows = table.rows.map((row: SheetRow) =>
      row.c.map((cell: SheetCell | null) => {
        if (!cell || cell.v === null || cell.v === undefined) return '';
        return String(cell.v);
      })
    );

    return [headers, ...dataRows];
  } catch (error) {
    console.error(`Error fetching from Google Visualization API (GID: ${gid}):`, error);
    return [];
  }
}
