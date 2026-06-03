import { test, expect } from '@playwright/test';
import { sendToWinks } from '../utils/winksReporter';

test('Search Flow', async ({ page }) => {

  await sendToWinks('Search test started', 'START');

  await page.goto('https://books.toscrape.com');
  await sendToWinks('Opened search page', 'INFO');

  // Validate page loaded
  const title = page.locator('h1');
  await expect(title).toBeVisible();
  await sendToWinks('Page loaded successfully', 'PASS');

  // Find all book items
  const books = page.locator('article.product_pod');
  const count = await books.count();
  expect(count).toBeGreaterThan(0);
  await sendToWinks(`Found ${count} books on page`, 'PASS');

  // Click first book
  const firstBook = books.first();
  const bookTitle = await firstBook.locator('h3 a').getAttribute('title');
  await firstBook.locator('h3 a').click();
  await sendToWinks(`Opened book: ${bookTitle}`, 'INFO');

  // Validate book detail page loaded
  await page.waitForSelector('article.product_page');
  await sendToWinks('Book detail page loaded', 'PASS');

  await sendToWinks('Search test finished', 'END');

});