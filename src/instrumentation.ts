import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config.ts');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config.ts');
  }
}

export const onRequestError = Sentry.captureRequestError;
