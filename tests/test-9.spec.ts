import { test, expect, chromium } from '@playwright/test';

test('test', async () => {
  // Launch browser in headless mode
  const browser = await chromium.launch({
    headless: true, // Set to true for headless mode
  });

  const page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto('https://vistaar.spinehr.in/login.aspx?ReturnUrl=%2fstart_new.aspx');

    // Check if the "Accept All Cookies" button exists
    const acceptCookiesButton = await page.waitForSelector('input[type="submit"][name="btnAccept"][value="Accept all Cookies"]', { timeout: 5000 });

    // If the button exists, click on it
    if (acceptCookiesButton) {
      await acceptCookiesButton.click();
      console.log('Clicked on Accept All Cookies button.');
    } else {
      console.log('Accept All Cookies button not found or already accepted. Proceeding with login.');
    }

    // Fill in the username and password
    await page.fill('#txtUser', 'V1063');
    await page.fill('#txtPassword', 'Employee@1102');

    // Submit the login form
    await page.click('#btnLogin');

    // Continue with the rest of your test logic here...

  } catch (error) {
    console.error('Error during the test:', error);
  } finally {
    await browser.close(); // Close the browser after the test
  }
});
