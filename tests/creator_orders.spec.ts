import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('Creator Orders', () => {
  test('should be able to see orders', async ({ page }) => {
    // TODO: 
    const username = 'rolf@ruecker.example';
    const password = '1Password@';
    
    await page.goto('/login');
    await page.fill('input[name="sign_in[email]"]', username);
    await page.fill('input[name="sign_in[password]"]', password);
    await page.click('button[type="submit"]');
    
    await page.waitForEvent('load');
    await page.waitForLoadState('networkidle');
    
    // await page.goto('/creators/orders');
    await page.click('a[href="/creators/orders"]');
    await page.waitForLoadState('networkidle');

    // refresh page
    // loop 10 times
    // Listen for all console events and handle errors
    
    // create a new file in root
    

    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error')
        errors.push(msg.text());
        // errors.push(`Error text: "${msg.text()}"`);
    });

    const currentPath = process.cwd();
    const filePath = `${currentPath}/logs.txt`;

    fs.writeFile(filePath, errors.toString(), function (err) {
      if (err) throw err;
      console.log('File created successfully!');
    });
    
  });
});
