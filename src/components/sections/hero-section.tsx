import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

export async function HeroSection() {
  const t = await getTranslations('hero');

  return (
    <section className="bg-gradient-to-br from-brand-primary to-[#0f2640] py-20 text-white md:py-32">
      <Container className="text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {t('heading')}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 md:text-xl">
          {t('subheading')}
        </p>
        <Link href="/services">
          <Button size="lg" className="bg-brand-secondary text-brand-primary hover:bg-brand-secondary-light">
            {t('cta')}
          </Button>
        </Link>
      </Container>
    </section>
  );
}
