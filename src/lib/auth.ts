import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AccountData {
  id: string;
  email: string;
  fullName: string;
  areaCode: string;
  phoneNumber: string;
  gender: string;
  websiteCreatedAt: string;
  createdAt: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// JWT utilities
export function generateJWT(accountData: AccountData): string {
  return jwt.sign(accountData, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyJWT(token: string): AccountData | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AccountData;
  } catch {
    return null;
  }
}

// Session utilities
export async function createSession(accountId: string): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

  await prisma.session.create({
    data: {
      accountId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validateSession(token: string): Promise<AccountData | null> {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { account: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return {
    id: session.account.id,
    email: session.account.email,
    fullName: session.account.fullName,
    areaCode: session.account.areaCode,
    phoneNumber: session.account.phoneNumber,
    gender: session.account.gender,
    websiteCreatedAt: session.account.websiteCreatedAt,
    createdAt: session.account.createdAt.toISOString(),
  };
}

export async function deleteSession(token: string): Promise<void> {
  await prisma.session.deleteMany({
    where: { token },
  });
}

// Password reset utilities
export async function createPasswordResetToken(accountId: string): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      accountId,
      token,
      expiresAt,
    },
  });

  return token;
}

export async function validatePasswordResetToken(token: string): Promise<string | null> {
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    return null;
  }

  return resetToken.accountId;
}

export async function markPasswordResetTokenAsUsed(token: string): Promise<void> {
  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  });
}

// Account utilities (for customer accounts)
export async function findAccountByEmail(email: string, websiteCreatedAt?: string) {
  const lowercasedEmail = email.toLowerCase();
  if (websiteCreatedAt) {
    return prisma.account.findFirst({
      where: {
        email: lowercasedEmail,
        websiteCreatedAt,
      },
    });
  }
  // If no websiteCreatedAt provided, search across all websites
  return prisma.account.findFirst({
    where: { email: lowercasedEmail },
  });
}

export async function createAccount(accountData: {
  id?: string;
  email: string;
  fullName: string;
  areaCode: string;
  phoneNumber: string;
  gender: string;
  password: string;
  websiteCreatedAt?: string;
}) {
  const hashedPassword = await hashPassword(accountData.password);

  return prisma.account.create({
    data: {
      id: accountData.id,
      email: accountData.email.toLowerCase(),
      fullName: accountData.fullName,
      areaCode: accountData.areaCode,
      phoneNumber: accountData.phoneNumber,
      gender: accountData.gender,
      password: hashedPassword,
      websiteCreatedAt: accountData.websiteCreatedAt || 'Vietnam Local Site',
    },
  });
}

export async function updateAccountPassword(accountId: string, newPassword: string): Promise<void> {
  const hashedPassword = await hashPassword(newPassword);

  await prisma.account.update({
    where: { id: accountId },
    data: { password: hashedPassword },
  });
}
