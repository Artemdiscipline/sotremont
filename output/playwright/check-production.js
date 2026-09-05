async (page) => {
  const errors = [], warnings = [], failed = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); if (msg.type() === 'warning') warnings.push(msg.text()); });
  page.on('requestfailed', req => failed.push(req.url()));
  await page.context().unroute('https://t.me/**');
  await page.setViewportSize({ width:1440, height:1000 });
  await page.goto('http://127.0.0.1:4173/');
  await page.getByRole('heading', {level:1}).waitFor();
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(async () => {
    const robots = await fetch('/robots.txt').then(r => r.text());
    const sitemap = await fetch('/sitemap.xml').then(r => r.text());
    const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    return { title:document.title, description:document.querySelector('meta[name=description]').content, openGraph:document.querySelector('meta[property="og:title"]').content, schemaType:schema['@type'], phone:schema.telephone, address:schema.address, canonical:document.querySelector('link[rel=canonical]')?.href ?? null, robots, validSitemap:!new DOMParser().parseFromString(sitemap,'application/xml').querySelector('parsererror'), localAssets:performance.getEntriesByType('resource').every(r=>r.name.startsWith(location.origin)), scripts:performance.getEntriesByType('resource').filter(r=>r.name.endsWith('.js')).length, jsonLdNoInventedRating:!schema.aggregateRating };
  });
  if (data.schemaType !== 'LocalBusiness' || !data.validSitemap || !data.localAssets || !data.jsonLdNoInventedRating || errors.length || failed.length) throw new Error(JSON.stringify({data,errors,failed}));
  await page.getByRole('link', {name:'Узнать стоимость',exact:true}).click();
  await page.getByRole('radio', {name:'Не заряжается',exact:true}).check();
  await page.getByRole('button', {name:'Подсказать ремонт',exact:true}).click();
  if (await page.locator('.diagnostic-result h3').textContent() !== 'Ремонт разъёма зарядки') throw new Error('Production flow failed');
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('heading', {level:1}).waitFor();
  return {data, errors, warnings, failed, productionDiagnostic:true};
}
