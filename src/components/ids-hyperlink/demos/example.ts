import '../ids-hyperlink.ts';
import type IdsHyperlink from '../ids-hyperlink.ts';

const link = document.querySelector<IdsHyperlink>('#link-no-href');

link?.addEventListener('click', (e) => {
  console.info('No href link has been clicked', e);
});
