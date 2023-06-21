// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any) {
      on('task', {
        log(message: string) {
          // eslint-disable-next-line no-console
          console.log(message);
          return null;
        },
        table(message: string) {
          // eslint-disable-next-line no-console
          console.table(message);
          return null;
        },
      });

      // eslint-disable-next-line global-require
      return require('@cypress/code-coverage/task')(on, config);
    },
  },
  includeShadowDom: true,
  chromeWebSecurity: false
});
