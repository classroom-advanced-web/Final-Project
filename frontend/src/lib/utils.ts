import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { utils, writeFile } from 'xlsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return date.getFullYear() + '-' + month + '-' + day;
}

export function getInviteUrl(involuteId: string) {
  return `${window.location.host}/invite?code=${involuteId}`;
}

export function arrayMove({ arr, old_index, new_index }: { arr: any[]; old_index: number; new_index: number }) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

export function writeExcelFile(data: any[], filename: string) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, filename);
}

// export function readExcelFile(data: any[], filename: string) {
//   const worksheet = utils.json_to_sheet(data);
//   const workbook = utils.book_new();
// }
