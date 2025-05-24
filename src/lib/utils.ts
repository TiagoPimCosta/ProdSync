import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
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

export function greetingsMessage(name: string): string {
  const hora = dayjs().hour();
  let message;

  if (hora >= 6 && hora < 12) {
    message = "Bom dia, ";
  } else if (hora >= 12 && hora < 18) {
    message = "Boa tarde, ";
  } else {
    message = "Boa noite, ";
  }

  return message + name;
}
