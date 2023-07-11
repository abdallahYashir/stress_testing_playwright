import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';

test.describe('Creator Orders', () => {
  test('should be able to see orders', async ({ page }) => {
    
    const username = 'creator551414@octoly.com';
    const password = '1Password@';
    
    await page.goto('/login');
    await page.fill('input[name="sign_in[email]"]', username);
    await page.fill('input[name="sign_in[password]"]', password);
    await page.click('button[type="submit"]');
    
    await page.waitForLoadState('networkidle');
    
    for (let i = 0; i < 100; i++) {
      await goToOrders(page);
      await cycleOrdersTabs(page);
    }
    
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error')
      errors.push(msg.text());
      errors.push(`Error text: "${msg.text()}"`);
    });
    
    const currentPath = process.cwd();
    const filePath = `${currentPath}/creator_orders_logs.txt`;
    
    fs.writeFile(filePath, errors.toString(), function (err) {
      if (err) throw err;
      console.log('File created successfully!');
    });
    
  });
});

// create a function that will go to orders and the different tabs
async function goToOrders(page: Page) {
  await page.goto('/creators/orders');
  // await page.click('a[href="/creators/orders"]');
  // await page.waitForLoadState('networkidle');
}

async function cycleOrdersTabs(page: Page) {
  await page.getByRole('tab', { name: 'All' }).click();
  await page.getByRole('tab', { name: 'Awaiting application' }).click();
  await page.getByRole('tab', { name: 'Awaiting shipping' }).click();
  await page.getByRole('tab', { name: 'To do' }).click();
  await page.getByRole('tab', { name: 'Published' }).first().click();
  await page.getByRole('tab', { name: 'Published' }).last().click();
  await page.getByRole('tab', { name: 'Archived' }).click();
}
