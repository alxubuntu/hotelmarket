'use client';

import { useState, useEffect, useRef, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '51901201502';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WhatsAppModal({ open, onClose }: ModalProps) {
  const t = useTranslations('partners.cta.modal');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleClose() {
    setName('');
    setEmail('');
    onClose();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const text = [
      'Hola, estoy interesado en ser socio de Hotel Market Pro.',
      '',
      `Nombre: ${name}`,
      `Email: ${email}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    handleClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="m-auto w-full max-w-md rounded-xl border border-neutral-200 bg-white p-0 shadow-2xl backdrop:bg-black/40"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="mb-2 text-xl font-bold text-brand-primary">
          {t('heading')}
        </h2>
        <p className="mb-6 text-sm text-neutral-500">
          {t('subtext')}
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="modal-name" className="mb-1 block text-sm font-medium text-neutral-700">
              {t('name')}
            </label>
            <input
              id="modal-name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              placeholder={t('namePlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="modal-email" className="mb-1 block text-sm font-medium text-neutral-700">
              {t('email')}
            </label>
            <input
              id="modal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              placeholder={t('emailPlaceholder')}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button type="button" variant="outline" size="lg" className="flex-1" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button type="submit" size="lg" className="flex-1">
            {t('submit')}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
