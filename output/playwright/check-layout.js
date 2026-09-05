async (page) => {
  const report = [];
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('link', { name: 'Перейти к содержимому', exact: true }).waitFor({ state:'attached' });
  await page.context().unroute('https://t.me/**');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => document.fonts.ready);
  for (const [width, height] of [[1440,1000],[768,1024],[390,844]]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0,0));
    const metrics = await page.evaluate(() => ({
      width: innerWidth, documentWidth: document.documentElement.scrollWidth,
      overflowing: [...document.querySelectorAll('main *')].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1) && !el.closest('.route-illustration,.sample-phone');
      }).map(el => ({ tag: el.tagName, class: el.className, text: el.textContent.slice(0,60) })),
      brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
      fonts: document.fonts.status,
    }));
    if (metrics.width !== metrics.documentWidth || metrics.brokenImages.length || metrics.overflowing.length) throw new Error(JSON.stringify(metrics));
    report.push(metrics);
    await page.screenshot({ path: `output/playwright/final-${width}.png`, fullPage: true });
    await page.screenshot({ path: `output/playwright/hero-${width}.png` });
  }
  await page.getByRole('link', { name: 'Узнать стоимость', exact: true }).click();
  await page.getByRole('combobox', { name: 'Модель если знаете', exact: true }).fill('iPhone 14');
  await page.getByRole('radio', { name: 'Разбит экран', exact: true }).check();
  await page.getByRole('button', { name: 'Подсказать ремонт', exact: true }).click();
  await page.locator('.diagnostic-result').screenshot({ path:'output/playwright/diagnostic-result.png' });
  await page.setViewportSize({ width:1440, height:1000 });
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('link', { name: 'Перейти к содержимому', exact: true }).waitFor({ state:'attached' });
  await page.bringToFront();
  await page.keyboard.press('Tab');
  const firstFocus = await page.evaluate(() => ({ name:document.activeElement.textContent, outline: getComputedStyle(document.activeElement).outlineStyle }));
  if (!firstFocus.name.includes('Перейти к содержимому') || firstFocus.outline !== 'solid') throw new Error('Skip/focus failed');
  report.push({ keyboard: firstFocus, consoleErrors: errors });
  return report;
}
