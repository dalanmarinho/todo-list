export function formatDate(date: string): string {
  return date.split("-").reverse().join("-").replace(/-/g, '/');
}

