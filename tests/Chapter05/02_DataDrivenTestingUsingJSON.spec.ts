// Import playwright module
import { test, expect } from '@playwright/test';
import testData from '../../test-data/qa/testdata.json';

type TestData = {
    TestDataSet1: {
        Skill1: string,
        Skill2: string
    },
    TestDataSet2: {
        Skill1: string,
        Skill2: string
    },
}
const typedTestData = testData as TestData;

/**
 * Author Testers Talk
 */
for (const dataSetName in typedTestData) {

    const skill = typedTestData[dataSetName as keyof TestData];

    test(`Data Driven Testing Using JSON file in playwright : ${skill.Skill2}`, async ({ page }) => {
        // Go to URL
        await page.goto('https://www.google.com/');

        // Search with keywords
        await page.getByLabel('Search', { exact: true }).fill(skill.Skill2);
        await page.getByLabel('Search', { exact: true }).press('Enter');

        // Click on playlist
        await page.getByRole('link', { name: skill.Skill2 }).first().click();

        // Validate web page title 
        await expect(page).toHaveTitle(skill.Skill2 + '☑️ - YouTube');
    });
}


