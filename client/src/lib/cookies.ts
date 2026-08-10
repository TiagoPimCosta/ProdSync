'use server';

import { cookies } from 'next/headers';

const AUTH_TOKEN_MAX_AGE = 60 * 60;

export const setAuthToken = (token: string): void => {
  cookies().set({
    name: 'authToken',
    value: token,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: AUTH_TOKEN_MAX_AGE,
  });
};

export const getAuthToken = async (): Promise<string | undefined> => {
  return cookies().get('authToken')?.value;
};

export const removeAuthToken = async (): Promise<void> => {
  cookies().delete({ name: 'authToken', path: '/' });
};
