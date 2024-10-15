import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardTextRegex = /<p id="card-text">[^]*?<\/p>/;

export const descriptionRegex = /<div id="description">[^]*?<\/div>/;

export const descriptionContentRegex = /<div id="description"[^>]*>([\s\S]*?)<\/div>/;
