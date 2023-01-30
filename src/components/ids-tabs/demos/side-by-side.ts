import '../../ids-text/ids-text.ts';
import '../../ids-header/ids-header.ts';

import '../ids-tabs.ts';
import '../ids-tab.ts';
import '../ids-tab-content.ts';
import '../ids-tabs-context.ts';
import '../ids-tab-divider.ts';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelector('ids-tabs');

  tabs?.addEventListener('change', (e: Event | CustomEvent | any) => {
    console.info(`#${e.target?.getAttribute('id')}.on('change') =>`, e.target?.value);
  });
});
