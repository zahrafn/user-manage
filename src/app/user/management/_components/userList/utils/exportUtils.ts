import { ExcelUser } from '../hooks/useUserExcelExport';

export const exportToExcel = async (
  data: ExcelUser[],
  fileName: string,
  sheetName = 'Sheet1'
) => {
  try {
    const XLSX = await import('xlsx');

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  } catch (error) {
    console.error('Failed to export to Excel:', error);
  }
};
