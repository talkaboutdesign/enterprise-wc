import '../../ids-text/ids-text.ts';
import '../../ids-header/ids-header.ts';

import '../ids-tabs.ts';
import '../ids-tab.ts';
import '../ids-tab-content.ts';
import '../ids-tabs-context.ts';
import '../ids-tab-divider.ts';
import '../../ids-toolbar/ids-toolbar.ts';

document.addEventListener('DOMContentLoaded', () => {
  const tabElements = [...document.querySelectorAll('ids-tabs')];

  tabElements.forEach((el) => el.addEventListener('change', (e: Event | CustomEvent | any) => {
    console.info(`ids-tabs.on('change') =>`, e.target.value);
  }));
});
