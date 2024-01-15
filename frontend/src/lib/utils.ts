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

export function timeAgo(createdAt: Date): string {
  const now = new Date();
  const createdAtDate = new Date(createdAt);
  const timeDifference = now.getTime() - createdAtDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    if (seconds < 0) return 'just now';

    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
}

// export function readExcelFile(data: any[], filename: string) {
//   const worksheet = utils.json_to_sheet(data);
//   const workbook = utils.book_new();
// }
