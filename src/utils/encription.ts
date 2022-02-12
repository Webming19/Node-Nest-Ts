import * as crypto from 'crypto';

export const addSalt = (): string => crypto.randomBytes(3).toString('base64');

export function encript(password: string, salt: string): string {
  return crypto
    .pbkdf2Sync(password, salt, 1000, 16, 'sha256')
    .toString('base64');
}
