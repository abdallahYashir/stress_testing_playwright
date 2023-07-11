import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';

test.describe('Creator Campaigns Search', () => {
  test('should be able to see campaigns in search', async ({ page }) => {
    
    const username = 'creator551414@octoly.com';
    const password = '1Password@';
    
    await page.goto('/login');
    await page.fill('input[name="sign_in[email]"]', username);
    await page.fill('input[name="sign_in[password]"]', password);
    await page.click('button[type="submit"]');
    
    await page.waitForLoadState('networkidle');
    
    for (let i = 0; i < 100; i++) {
      await goToCampaignsSearch(page);
      await cycleCampaignsCategories(page);
    }
    
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error')
      errors.push(msg.text());
      errors.push(`Error text: "${msg.text()}"`);
    });
    
    const currentPath = process.cwd();
    const filePath = `${currentPath}/campaigns_search_logs.txt`;
    
    fs.writeFile(filePath, errors.toString(), function (err) {
      if (err) throw err;
      console.log('File created successfully!');
    });
    
  });
});

async function goToCampaignsSearch(page: Page) {
  await page.goto('/creators/campaigns/search');
}

async function cycleCampaignsCategories(page: Page) {
  await page.getByRole('tab', { name: 'All' }).click();
  await page.getByRole('tab', { name: 'Awaiting application' }).click();
  await page.getByRole('tab', { name: 'Awaiting shipping' }).click();
  await page.getByRole('tab', { name: 'To do' }).click();
  await page.getByRole('tab', { name: 'Published' }).first().click();
  await page.getByRole('tab', { name: 'Published' }).last().click();
  await page.getByRole('tab', { name: 'Archived' }).click();
}
