const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  // Disable JavaScript to test fallback
  await page.route('**/*', route => {
    if (route.request().url().endsWith('.js')) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('https://hotelmarket-teal.vercel.app/es/partners', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('JS disabled. Page loaded.');

  // Find the CTA link
  const ctaLink = page.locator('a[href*="wa.me"]');
  const linkCount = await ctaLink.count();
  console.log('WhatsApp links found:', linkCount);

  if (linkCount > 0) {
    const href = await ctaLink.first().getAttribute('href');
    console.log('Link href:', href);

    // Check if the link is visible
    const isVisible = await ctaLink.first().isVisible();
    console.log('Link visible:', isVisible);

    // Check text content
    const text = await ctaLink.first().textContent();
    console.log('Link text:', text);

    // Take screenshot
    await page.screenshot({ path: '/tmp/mobile-nojs.png', fullPage: false });
    console.log('Screenshot saved to /tmp/mobile-nojs.png');
  } else {
    console.log('No wa.me links found');

    // Check for any CTA text
    const body = await page.textContent('body');
    const hasSerSocio = body?.includes('Ser Socio') || body?.includes('Become a Partner');
    console.log('Has CTA text:', hasSerSocio);

    await page.screenshot({ path: '/tmp/mobile-nojs.png', fullPage: false });
  }

  await browser.close();
})();
