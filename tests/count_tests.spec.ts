// Import playwright module
import { test } from '@playwright/test';

/**
 * Author Testers Talk
 */
test('Count total tests in playwright report', async ({ page }) => {

    const reportPath = 'file:///path/PlaywrightTypeScriptTutorialFullCourse/screenshots/index.html';
    await page.goto(reportPath);

    // Object to store the counts of tests (passed, failed) per spec file
    const testStatusCounts: Record<string, { passed: number, failed: number }> = {};

    // Get all chips (each representing a spec file)
    const chips = await page.locator('.chip').all();

    for (const chip of chips) {
        // Extract the spec file path from the header
        const filePath = await chip.locator('.chip-header span').textContent();

        if (filePath) {
            let passedCount = 0;
            let failedCount = 0;

            // Get all test entries under this spec file
            const testEntries = await chip.locator('.test-file-test').all();

            for (const testEntry of testEntries) {
                // Check the test status (success or failure)
                const testStatusIcon = await testEntry.locator('.test-file-test-status-icon svg').getAttribute('class');

                if (testStatusIcon?.includes('color-icon-success')) {
                    passedCount++;
                } else if (testStatusIcon?.includes('color-icon-fail')) {
                    failedCount++;
                }
            }

            // Store the count of passed and failed tests for this spec file
            testStatusCounts[filePath] = { passed: passedCount, failed: failedCount };
        }
    }

    // Print the result
    console.log(testStatusCounts);

});