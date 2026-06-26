'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

type FormStatus =
  | { type: 'idle' }
  | { type: 'sending' }
  | { type: 'success' }
  | { type: 'error'; message: string }
  | { type: 'rate_limited'; retryAfter: number };

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: 'sending' });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 429) {
        setStatus({ type: 'rate_limited', retryAfter: data.retryAfter ?? 60 });
        return;
      }

      if (!res.ok || data.status === 'error') {
        const errorMsg = data.errors?.[0]?.message ?? 'Something went wrong. Please try again.';
        setStatus({ type: 'error', message: errorMsg });
        return;
      }

      setStatus({ type: 'success' });
      form.reset();
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    }
  }

  const inputClasses =
    'w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 disabled:opacity-60';

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container className="mx-auto max-w-2xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h2>
        <p className="mb-12 text-center text-neutral-600">
          {t('subheading')}
        </p>

        {status.type === 'success' ? (
          <div
            className="rounded-lg border border-green-200 bg-green-50 px-6 py-8 text-center"
            role="alert"
          >
            <p className="text-lg font-semibold text-green-800">
              {t('success.title')}
            </p>
            <p className="mt-2 text-green-600">
              {t('success.body')}
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
                minLength={2}
                maxLength={100}
                disabled={status.type === 'sending'}
                className={inputClasses}
                placeholder={t('fields.namePlaceholder')}
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
                placeholder={t('fields.emailPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium text-neutral-700">
                {t('fields.subject')}
              </label>
              <select
                id="subject"
                name="subject"
                required
                disabled={status.type === 'sending'}
                className={inputClasses}
              >
                <option value="">{t('fields.subject')}</option>
                <option value="general">{t('fields.subjectGeneral')}</option>
                <option value="demo">{t('fields.subjectDemo')}</option>
                <option value="partners">{t('fields.subjectPartners')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-neutral-700">
                {t('fields.message')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                disabled={status.type === 'sending'}
                className={inputClasses}
                placeholder={t('fields.messagePlaceholder')}
              />
            </div>

            {status.type === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {status.message}
              </div>
            )}

            {status.type === 'rate_limited' && (
              <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700" role="alert">
                {t('rateLimited.body')}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={status.type === 'sending'}>
              {status.type === 'sending' ? t('sending') : t('submit')}
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
