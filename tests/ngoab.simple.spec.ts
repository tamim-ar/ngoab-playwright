import { expect, test } from '@playwright/test';

const BASE_URL = 'http://e-service.ngoab.gov.bd/';

test.describe('NGOAB e-service simple smoke tests', () => {
  test('homepage loads', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page).toHaveURL(/e-service\.ngoab\.gov\.bd/);
    await expect(page.locator('a[href*="login"]')).not.toHaveCount(0);
  });

  test('NGO login page opens directly', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('registration instruction page is reachable', async ({ page }) => {
    await page.goto(`${BASE_URL}ngoInstructionPageApply`);

    await expect(page).toHaveURL(/ngoInstructionPageApply/);
    await expect(page.locator('body')).toContainText(/NGO|Instruction|Registration/i);
  });

  test('complaint/fee-list module route is reachable', async ({ page }) => {
    await page.goto(`${BASE_URL}ngoRegistrationFeeList`);

    await expect(page).toHaveURL(/ngoRegistrationFeeList/);
    await expect(page.locator('body')).toBeVisible();
  });
});
