import crypto from "node:crypto";

export interface TelegramAuthData {
  id: string;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

export function verifyTelegramAuth(
  botToken: string,
  data: TelegramAuthData,
): boolean {
  const { hash, ...dataToCheck } = data;

  // Create data-check-string
  const checkString = Object.keys(dataToCheck)
    .sort()
    .map((key) => `${key}=${dataToCheck[key as keyof typeof dataToCheck]}`)
    .join("\n");

  // Create secret key
  const secretKey = crypto.createHash("sha256").update(botToken).digest("hex");

  // Calculate HMAC-SHA256
  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(checkString, "utf8")
    .digest("hex");

  return calculatedHash === hash;
}

export function isAuthDateValid(
  authDate: string,
  maxAgeSeconds: number = 86_400,
): boolean {
  const authTimestamp = Number.parseInt(authDate, 10);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp - authTimestamp < maxAgeSeconds;
}
