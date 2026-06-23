import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <Container as="div" className="py-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Hotel Market Pro. {t('rights')}
        </p>
      </Container>
    </footer>
  );
}
