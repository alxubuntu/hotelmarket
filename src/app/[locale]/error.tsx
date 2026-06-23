'use client';

import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-brand-primary">500</h1>
      <h2 className="mb-2 text-2xl font-semibold text-neutral-dark">
        Algo salió mal
      </h2>
      <p className="mb-8 max-w-md text-center text-neutral-500">
        Ocurrió un error inesperado. Por favor, intentá de nuevo.
      </p>
      <button
        onClick={reset}
        className="rounded bg-brand-primary px-6 py-3 text-white transition-colors hover:bg-[var(--color-brand-primary-light)]"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
