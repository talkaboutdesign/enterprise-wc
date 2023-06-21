# Testing

The IDS components are backed by functional, unit and end-to-end (e2e) test suites.  When contributing to the project we expect that new tests will be provided to prove that new functionality works, and that all existing tests pass.

The testing strategy is to aim for 100% coverage but initially 80% is the minimum. You should try to make sure to cover all the functionality of the component with tests. Any time you fix a bug you should also make an additional test for that bug if it was not noticed by a test.

## Intro To Cypress

Review the following curated tutorials:

- [Intro To Cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress)
- [Recipes](https://docs.cypress.io/examples/recipes)

## Isolate a test on the command line

```sh
npx cypress run --spec cypress/e2e/ids-tag/*
```

## What to test for a component

Basically everything but we found that the following returns the best result for the amount of time.

- Load the page
- No Errors in the page
- No Memory Leaks
- Each setter is called with edge cases and options (settings)
- Each Public method is called
- Any public events are triggered and return data
- Axe Test (with some skips is allow)
- Visual test for each theme (basics / chrome only)

## Testing Guidelines and Rules

- Leave the page how you found it. If you add elements to the page remove them after the test. Cleanup anything after to avoid random test runs running into unexpected issues.

## Tools Used

- [Cypress Axe](https://github.com/component-driven/cypress-axe)
- [Cypress](https://docs.cypress.io/api/table-of-contents) test runner for all tests.

## Running tests in debug mode with the UI

Run ` npm run test:open` to open the cypress UI. In this tool you can select the tests you want to run and open the dev tools. And place a debugger in the lines in the test you want to debug. Your running in the browser.

## Skipping Tests

- You can run a specific test by name such as `npx cypress run --spec cypress/e2e/ids-tag/*`
- To run only one test in a suite add only. For example `test.only(`. This only works when limiting scope. (i.e. `npm run test -- component-func`)
- To run only one suite use `describe.only(`. This only works when limiting scope. (i.e. `npm run test -- component-func`)
- To skip a test add `test.skip(`

## Visual Regression tests ///// OLD

We are using [percy.io](https://docs.percy.io/docs/puppeteer) for visual regression tests. First run the e2e tests with the special "percy" command `npm run test:visuals`. To run this you need to add the `PERCY_TOKEN` to your bashrc from the [percy settings page](https://percy.io/Infor-Design-System/IDS-Web-Components/settings).

We should have one visual regression image per component. When you PR a test an action will ask that reviewers check the images and approve. An example test looks like this:

```js
  it('should not have visual regressions (percy)', async () => {
    await page.goto('http://localhost:4444/ids-tag', { waitUntil: ['networkidle0', 'domcontentloaded'] });
    await percySnapshot(page, 'ids-tag');
  });
```

## Coverage ///// OLD

- To run in coverage mode (which may take more time than just running tests alone), use the command `npm run test:coverage`
- Open the local file `<folder>/coverage/index.html` in any browser
- Drill in to the component in question and try and improve coverage to 100% at a minimum statements, branches, functions and lines should al be green
- The build checks will drop if we go below 95% or the coverage decreases (working on tweaking the right values here)
- If while inspecting the coverage report you notice a black "E" or "I", this would indicate that a connected logic branch (else or if) to the line reported is not detected as covered

We are trying for full coverage (100%) but this is not always possible. But do your best.
Keep in mind we can now cover tests with either an 2e test or a functional test. Functional tests in jest are faster and can be used for things like:

- Testing the functions/api
- Testing the settings/getters and setters
- Testing Keyboard (although this can also be done in e2e)
- Testing event handlers and firing events

e2e tests can be best for:

- Some jest bugs with shadowRoot
- Mouse, Touch, Dragging, Keyboard
- Accessibility Scans
