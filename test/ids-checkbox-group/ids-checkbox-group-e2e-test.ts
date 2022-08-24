import { AxePuppeteer } from '@axe-core/puppeteer';
import countObjects from '../helpers/count-objects';

describe('Ids Checkbox Group e2e Tests', () => {
  const url = 'http://localhost:4444/ids-checkbox-group/example.html';

  beforeAll(async () => {
    await page.goto(url, { waitUntil: ['networkidle2', 'load'] });
  });

  it('should not have errors', async () => {
    await expect(page.title()).resolves.toMatch('IDS Checkbox Group Component');
  });

  it('should pass Axe accessibility tests', async () => {
    await page.setBypassCSP(true);
    await page.goto(url, { waitUntil: ['networkidle2', 'load'] });
    const results = await new AxePuppeteer(page).analyze();
    expect(results.violations.length).toBe(0);
  });

  it.skip('should not have memory leaks', async () => {
    const numberOfObjects = await countObjects(page);
    await page.evaluate(() => {
      document.body.insertAdjacentHTML('beforeend', `<ids-checkbox-group id="test" label="Choose from these options:">
        <ids-checkbox label="Option 1" checked="false"></ids-checkbox>
        <ids-checkbox label="Option 2" checked="true"></ids-checkbox>
        <ids-checkbox label="Option 3" checked="true"></ids-checkbox>
      </ids-checkbox-group>`);
      document.querySelector('#test')?.remove();
    });
    expect(await countObjects(page)).toEqual(numberOfObjects);
  });
});
