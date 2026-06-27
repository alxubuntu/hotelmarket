const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  await page.goto('https://hotelmarket-teal.vercel.app/es/partners', { waitUntil: 'networkidle' });
  console.log('Page loaded');

  const ctaLink = page.locator('a[href*="wa.me"]');
  const count = await ctaLink.count();
  console.log('wa.me links:', count);

  if (count > 0) {
    const box = await ctaLink.first().boundingBox();
    console.log('Link box:', JSON.stringify(box));

    // Scroll to the link first
    await ctaLink.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const boxAfterScroll = await ctaLink.first().boundingBox();
    console.log('Link box after scroll:', JSON.stringify(boxAfterScroll));

    // Check what element is at the center of the link
    if (boxAfterScroll) {
      const centerX = boxAfterScroll.x + boxAfterScroll.width / 2;
      const centerY = boxAfterScroll.y + boxAfterScroll.height / 2;

      const topElement = await page.evaluate(({x, y}) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return { tag: 'none' };
        const cs = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          text: el.textContent?.substring(0, 50),
          className: el.className?.substring(0, 150),
          pointerEvents: cs.pointerEvents,
          position: cs.position,
          zIndex: cs.zIndex,
          opacity: cs.opacity,
          visibility: cs.visibility,
        };
      }, { x: centerX, y: centerY });
      console.log('Element at center of link:', JSON.stringify(topElement, null, 2));
    }

    // Check for any overlays / fixed elements
    const fixedElements = await page.evaluate(() => {
      const els = document.querySelectorAll('*');
      const fixed = [];
      for (const el of els) {
        const cs = window.getComputedStyle(el);
        if (cs.position === 'fixed' || cs.position === 'sticky') {
          const box = el.getBoundingClientRect();
          if (box.width > 0 && box.height > 0) {
            fixed.push({
              tag: el.tagName,
              className: el.className?.substring(0, 80),
              position: cs.position,
              zIndex: cs.zIndex,
              pointerEvents: cs.pointerEvents,
              width: Math.round(box.width),
              height: Math.round(box.height),
              top: Math.round(box.top),
              left: Math.round(box.left),
            });
          }
        }
      }
      return fixed;
    });
    console.log('\nFixed/sticky elements:', JSON.stringify(fixedElements, null, 2));

    // Now try tapping
    console.log('\n=== Tapping link ===');
    await ctaLink.first().tap();
    await page.waitForTimeout(1500);

    const dialog = page.locator('dialog');
    if (await dialog.count() > 0) {
      const isOpen = await dialog.first().evaluate(el => el.open);
      console.log('Dialog open:', isOpen);
    }

    await page.screenshot({ path: '/tmp/mobile-debug.png', fullPage: false });
    console.log('Screenshot saved');
  }

  await browser.close();
})();
