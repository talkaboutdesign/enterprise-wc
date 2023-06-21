describe('Ids Tag e2e Tests', () => {
  it.skip('should not have memory leaks', async () => {
    const numberOfObjects = await countObjects(page);
    await page.evaluate(() => {
      document.body.insertAdjacentHTML('beforeend', `<ids-tag color="red" id="test">test</ids-tag>`);
      document.querySelector('#test')?.remove();

      // For testing - leaving this here for now
      // const onMessage = () => { /* ... */ };
      // window.addEventListener('message', onMessage);
    });
    expect(await countObjects(page)).toEqual(numberOfObjects);
  });

});
