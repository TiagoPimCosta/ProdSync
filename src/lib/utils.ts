import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLettersOfName(name: string) {
  const words = name.split(" ");

  const particles = ["de", "da", "do", "das", "dos"];

  const initials = words
    .filter((word) => !particles.includes(word.toLowerCase()))
    .map((word) => word[0])
    .join("");

  return initials.slice(0, 2).toUpperCase();
}
