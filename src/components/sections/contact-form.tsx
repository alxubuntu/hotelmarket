'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '51901201502';

type FormStatus =
  | { type: 'idle' }
  | { type: 'validating' }
  | { type: 'redirecting' }
  | { type: 'success' }
  | { type: 'error'; message: string };

function buildWhatsAppUrl(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const subjectLabels: Record<string, string> = {
    general: 'General Inquiry',
    demo: 'Request a Demo',
    partners: 'Partnership Inquiry',
  };
  const subjectLabel = subjectLabels[payload.subject] ?? payload.subject;

  const text = [
    `Hola, soy ${payload.name} (${payload.email}).`,
    '',
    `Asunto: ${subjectLabel}`,
    '',
    payload.message,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: 'validating' });

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setStatus({ type: 'idle' });
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    setStatus({ type: 'redirecting' });

    const url = buildWhatsAppUrl(payload);
    window.open(url, '_blank', 'noopener,noreferrer');

    setStatus({ type: 'success' });
    form.reset();
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
                disabled={status.type === 'redirecting'}
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
                disabled={status.type === 'redirecting'}
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
                disabled={status.type === 'redirecting'}
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
                disabled={status.type === 'redirecting'}
                className={inputClasses}
                placeholder={t('fields.messagePlaceholder')}
              />
            </div>

            {status.type === 'error' && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {status.message}
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={status.type === 'redirecting'}>
              {status.type === 'redirecting' ? t('sending') : t('submit')}
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
