import { test, expect } from '@playwright/test';
import { sendToWinks } from '../utils/winksReporter';

test('Login Flow', async ({ page }) => {

  await sendToWinks('Login test started', 'START');

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await sendToWinks('Opened login page', 'INFO');

  // Enter credentials
  await page.fill('#username', 'student');
  await sendToWinks('Username entered', 'INFO');

  await page.fill('#password', 'Password123');
  await sendToWinks('Password entered', 'INFO');

  // Click login
  await page.click('#submit');
  await sendToWinks('Login button clicked', 'INFO');

  // Validate successful login
  const successMsg = page.locator('.post-title');
  await expect(successMsg).toBeVisible();
  await sendToWinks('Login successful - landing page visible', 'PASS');

  // Validate URL changed
  expect(page.url()).toContain('logged-in-successfully');
  await sendToWinks('URL validation passed', 'PASS');

  await sendToWinks('Login test finished', 'END');

});

test('Login Flow - Invalid Credentials', async ({ page }) => {

  await sendToWinks('Invalid login test started', 'START');

  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await sendToWinks('Opened login page', 'INFO');

  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpass');
  await page.click('#submit');
  await sendToWinks('Invalid credentials submitted', 'INFO');

  // Validate error message
  const errorMsg = page.locator('#error');
  await expect(errorMsg).toBeVisible();
  await sendToWinks('Error message displayed correctly', 'PASS');

  await sendToWinks('Invalid login test finished', 'END');

});