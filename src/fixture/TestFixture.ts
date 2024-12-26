import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ResultPage } from '../pages/ResultPage';
import { PlaylistPage } from '../pages/PlaylistPage';

/**
 * author Testers Talk
 */
export const test = base.extend<{
    saveLogs: void;
    homePage: HomePage;
    resultPage: ResultPage;
    playlistPage: PlaylistPage;
}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');

        await use();

        console.log('Global afterEach is running...');
    },
    { auto: true }],
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    resultPage: async ({ page }, use) => {
        const resultPage = new ResultPage(page);
        await use(resultPage);
    },
    playlistPage: async ({ page }, use) => {
        const playlistPage = new PlaylistPage(page);
        await use(playlistPage);
    }
});

export { expect } from '@playwright/test';