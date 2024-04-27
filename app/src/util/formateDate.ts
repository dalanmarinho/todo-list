export function formatDate(date: string | number | Date): string {
  const formattedDate = new Date(date);

  if (isNaN(formattedDate.getTime())) {
    throw new Error("Data inválida");
  }

  const day   = (formattedDate.getDate() + 1).toString().padStart(2, "0");
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
  const year  = formattedDate.getFullYear();

  return `${day}-${month}-${year}`;
}
