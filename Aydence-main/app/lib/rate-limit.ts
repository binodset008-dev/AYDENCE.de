/**
 * Database-backed rate limiter.
 * Tracks submissions per IP per hour.
 * Max 5 booking attempts per IP per hour.
 */

import { prisma } from './db';

const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Check if the given IP is rate limited.
 * Returns { allowed, remaining, retryAfterMs }.
 */
export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
}> {
  const now = new Date();
  const key = `ip:${ip}`;

  try {
    const entry = await prisma.rateLimit.findUnique({
      where: { key },
    });

    if (!entry || now > entry.resetAt) {
      // First request or window expired — reset
      const resetAt = new Date(now.getTime() + WINDOW_MS);
      
      await prisma.rateLimit.upsert({
        where: { key },
        update: { count: 1, resetAt },
        create: { key, count: 1, resetAt },
      });
      
      return { allowed: true, remaining: MAX_REQUESTS - 1, retryAfterMs: 0 };
    }

    if (entry.count >= MAX_REQUESTS) {
      return {
        allowed: false,
        remaining: 0,
        retryAfterMs: entry.resetAt.getTime() - now.getTime(),
      };
    }

    await prisma.rateLimit.update({
      where: { key },
      data: { count: { increment: 1 } },
    });

    return {
      allowed: true,
      remaining: MAX_REQUESTS - (entry.count + 1),
      retryAfterMs: 0,
    };
  } catch (error) {
    console.error('Rate limit DB error:', error);
    // If rate limiting fails (e.g. DB issue), we fail open to not block real users.
    return { allowed: true, remaining: 1, retryAfterMs: 0 };
  }
}
