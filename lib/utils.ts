import { PrismaClient } from "@prisma/client";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const prisma = new PrismaClient();

export async function generateUniqueUsername(baseName: string): Promise<string> {
  let username = baseName;
  let isUnique = false;

  while (!isUnique) {
    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!existingUser) {
      isUnique = true;
    } else {
      // Append a random number to make it unique
      username = `${baseName}${Math.floor(Math.random() * 1000)}`;
    }
  }

  return username;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
