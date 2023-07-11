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
    
    for (let i = 0; i < 1; i++) {
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
  await page.getByText('All categories').click();
  await page.getByText('Cosmetics').click();
  await page.getByText('Fashion').click();
  await page.getByText('Fitness & Nutrition').click();
  await page.getByText('Food & Beverages').click();
  await page.getByText('Hair Care').click();
  await page.getByText('Home & Garden').click();
  await page.getByText('Oral Care').click();
}
