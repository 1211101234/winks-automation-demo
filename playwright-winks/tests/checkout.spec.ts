import { test, expect } from '@playwright/test';
import { sendToWinks } from '../utils/winksReporter';

test('Checkout Flow Demo', async ({ page }) => {

  await sendToWinks('Test Started', 'START');

  await page.goto('https://example.com');
  await sendToWinks('Opened application', 'INFO');

  await sendToWinks('User login successful', 'PASS');
  await sendToWinks('Product added to cart', 'PASS');
  await sendToWinks('Proceeding to payment', 'INFO');

  const paymentSuccess = true; // Simulate payment success/failure

  if (!paymentSuccess) {
    // Take screenshot and send to Winks
    const screenshotPath = 'test-results/failure-screenshot.png';
    await page.screenshot({ path: screenshotPath });
    await sendToWinks('Screenshot captured on failure', 'INFO');
    await sendToWinks('Payment failed - card declined', 'FAIL');
    throw new Error('Payment step failed during checkout');
  }

  await sendToWinks('Order confirmed', 'PASS');
  await sendToWinks('Test Finished', 'END');

});