const { test, expect } = require('@playwright/test');

test('can upload file', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000');

  const newPagePromise = page.context().waitForEvent('page');
  await page.click('#openWindowButton');
  const newPage = await newPagePromise;
  await newPage.close();

  // await page.locator('#fileInput').setInputFiles({
  //   name: 'file.txt',
  //   mimeType: 'text/plain',
  //   buffer: Buffer.from('example text', 'utf-8')
  // })
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.click('#fileInput');
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles({
    name: 'file.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('example text', 'utf-8')
  });

  await expect(page.locator('#filename')).toHaveText('Selected file: file.txt');
});
