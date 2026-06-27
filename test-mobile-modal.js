const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const iPhone = devices['iPhone 13'];
  const context = await browser.newContext({
    ...iPhone,
  });
  const page = await context.newPage();

  // Navigate to partners page
  await page.goto('https://hotelmarket-teal.vercel.app/es/partners', { waitUntil: 'networkidle' });

  console.log('Page loaded. Viewport:', page.viewportSize());

  // Find and click the "Ser Socio" button
  const btn = page.getByRole('button', { name: 'Ser Socio' });
  const btnCount = await btn.count();
  console.log('Buttons found:', btnCount);

  if (btnCount > 0) {
    await btn.first().click();
    console.log('Button clicked');

    // Wait for dialog to appear
    await page.waitForTimeout(1000);

    // Check dialog state
    const dialog = page.locator('dialog');
    const dialogCount = await dialog.count();
    console.log('Dialogs found:', dialogCount);

    if (dialogCount > 0) {
      const isOpen = await dialog.first().evaluate(el => el.open);
      console.log('Dialog open:', isOpen);

      // Get dialog dimensions
      const box = await dialog.first().boundingBox();
      console.log('Dialog bounding box:', JSON.stringify(box));

      // Take screenshot
      await page.screenshot({ path: '/tmp/mobile-modal.png', fullPage: false });
      console.log('Screenshot saved to /tmp/mobile-modal.png');

      // Check dialog content
      const heading = await dialog.first().locator('h2').textContent();
      console.log('Dialog heading:', heading);

      const inputs = await dialog.first().locator('input').count();
      console.log('Input fields:', inputs);

      const buttons = await dialog.first().locator('button').allTextContents();
      console.log('Dialog buttons:', buttons);
    }
  } else {
    // Try finding any button with text
    const allButtons = await page.locator('button').allTextContents();
    console.log('All buttons on page:', allButtons);

    // Take screenshot of current state
    await page.screenshot({ path: '/tmp/mobile-no-button.png', fullPage: false });
    console.log('No Ser Socio button found. Screenshot saved.');
  }

  await browser.close();
})();
