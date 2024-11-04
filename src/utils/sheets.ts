export function extractSheetId(url: string): string | null {
  try {
    const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function fetchSheetData(sheetId: string) {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`
    );
    const text = await response.text();
    const jsonText = text.replace('/*O_o*/', '').replace('google.visualization.Query.setResponse(', '').slice(0, -2);
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch sheet data');
  }
}

export function parseSheetData(rawData: any) {
  const cols = rawData.table.cols.map((col: any) => ({
    id: col.id,
    label: col.label,
    type: col.type,
  }));

  const rows = rawData.table.rows.map((row: any) => 
    row.c.map((cell: any) => cell?.v ?? null)
  );

  return {
    cols,
    rows,
    status: rawData.status,
  };
}