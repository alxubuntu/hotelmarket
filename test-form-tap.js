const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Test 1: With JS — modal should open
  console.log('=== Test 1: With JS (modal) ===');
  const iPhone = devices['iPhone 13'];
  const ctx1 = await browser.newContext({ ...iPhone });
  const p1 = await ctx1.newPage();
  await p1.goto('https://hotelmarket-teal.vercel.app/es/partners', { waitUntil: 'networkidle' });

  const form = p1.locator('form[action*="wa.me"]');
  const formCount = await form.count();
  console.log('Forms with wa.me action:', formCount);

  if (formCount > 0) {
    const btn = form.first().locator('button[type="submit"]');
    await btn.scrollIntoViewIfNeeded();
    await p1.waitForTimeout(500);

    // Check what's at the button's center
    const box = await btn.boundingBox();
    if (box) {
      const topEl = await p1.evaluate(({x, y}) => {
        const el = document.elementFromPoint(x, y);
        return el ? { tag: el.tagName, text: el.textContent?.substring(0, 30) } : null;
      }, { x: box.x + box.width/2, y: box.y + box.height/2 });
      console.log('Element at button center:', JSON.stringify(topEl));
    }

    await btn.tap();
    await p1.waitForTimeout(1000);

    const dialog = p1.locator('dialog');
    if (await dialog.count() > 0) {
      const isOpen = await dialog.first().evaluate(el => el.open);
      console.log('Dialog open after tap:', isOpen);
      if (isOpen) {
        const heading = await dialog.first().locator('h2').textContent();
        console.log('Modal heading:', heading);
      }
    }

    await p1.screenshot({ path: '/tmp/mobile-form-test.png', fullPage: false });
  }

  // Test 2: Without JS — should navigate to wa.me
  console.log('\n=== Test 2: Without JS (fallback) ===');
  const ctx2 = await browser.newContext({ ...iPhone });
  const p2 = await ctx2.newPage();
  await p2.route('**/*.js', route => route.abort());
  await p2.goto('https://hotelmarket-teal.vercel.app/es/partners', { waitUntil: 'domcontentloaded' });
  await p2.waitForTimeout(2000);

  const form2 = p2.locator('form[action*="wa.me"]');
  console.log('Forms with wa.me action (no JS):', await form2.count());

  if (await form2.count() > 0) {
    const action = await form2.first().getAttribute('action');
    const target = await form2.first().getAttribute('target');
    console.log('Form action:', action?.substring(0, 80));
    console.log('Form target:', target);

    const btn2 = form2.first().locator('button[type="submit"]');
    const btnVisible = await btn2.isVisible();
    console.log('Submit button visible:', btnVisible);
    const btnText = await btn2.textContent();
    console.log('Submit button text:', btnText);
  }

  await browser.close();
  console.log('\nAll tests done');
})();
