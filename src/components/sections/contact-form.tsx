import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export async function ContactForm() {
  const t = await getTranslations('contact');

  return (
    <section className="bg-neutral-background py-16 md:py-24">
      <Container className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-brand-primary md:text-4xl">
          {t('heading')}
        </h2>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              {t('fields.name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              placeholder={t('fields.name')}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              {t('fields.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              placeholder={t('fields.email')}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-neutral-700"
            >
              {t('fields.message')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded border border-neutral-300 px-4 py-3 text-neutral-900 placeholder-neutral-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              placeholder={t('fields.message')}
            />
          </div>
          <Button type="submit" size="lg" className="w-full">
            {t('submit')}
          </Button>
        </form>
      </Container>
    </section>
  );
}
