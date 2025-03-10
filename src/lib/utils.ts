import { clsx, type ClassValue } from "clsx";
import { format, formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";
import obj from "../assets/color.json";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const parsedDate = new Date(date);
  const now = new Date();
  const diffInYears = now.getFullYear() - parsedDate.getFullYear();

  if (diffInYears >= 1) {
    return format(parsedDate, "MMM d, yyyy");
  }

  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

export function getColorLang(lang: string) {
  const colors = obj as unknown as LanguageColors;
  return colors[lang]?.color || null;
}
