'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

type FormStatus =
  | { type: 'idle' }
  | { type: 'sending' }
  | { type: 'success' }
  | { type: 'error'; message: string };

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: 'sending' });

    // Placeholder: no backend yet — simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: replace with actual API call
    setStatus({ type: 'success' });
  }

  const inputClasses =
    'w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60';

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h2>

        {status.type === 'success' ? (
          <div
            className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center"
            role="alert"
          >
            <p className="text-lg font-semibold text-green-800">
              ¡Mensaje enviado con éxito!
            </p>
            <p className="mt-2 text-green-600">
              Gracias por contactarnos. Te responderemos a la brevedad.
            </p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-neutral-700">
                {t('fields.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={status.type === 'sending'}
                className={inputClasses}
                placeholder={t('fields.name')}
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">
                {t('fields.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={status.type === 'sending'}
                className={inputClasses}
                placeholder={t('fields.email')}
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-700">
                {t('fields.message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                disabled={status.type === 'sending'}
                className={inputClasses}
                placeholder={t('fields.message')}
              />
            </div>

            {status.type === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {status.message}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={status.type === 'sending'}>
              {status.type === 'sending' ? 'Enviando…' : t('submit')}
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
