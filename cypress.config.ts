import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
  },
  video: false,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'cypress/screenshots',
  downloadsFolder: 'cypress/downloads',
  viewportWidth: 1280,
  viewportHeight: 800
});

