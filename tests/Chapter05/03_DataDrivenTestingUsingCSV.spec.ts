// Import playwright module
import { test, expect } from '@playwright/test';

import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

type TestRecords = {
    Skill1: string,
    Skill2: string
}

const records = parse(
    fs.readFileSync(path.join(__dirname, '../../test-data/qa/testdata.csv')),
    {
        columns: true,
        skipEmptyLines: true
    }
) as TestRecords[];

/**
 * Author Testers Talk
 */
for (const record of records) {

    test(`Data Driven Testing Using CSV file in playwright : ${record.Skill2}`, async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill(record.Skill2);
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: record.Skill2 }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle(record.Skill2 + '☑️ - YouTube');
    });
}