// Supporting components
import '../../ids-layout-grid/ids-layout-grid.ts';
import '../ids-layout-flex.ts';

import css from '../../../assets/css/ids-layout-flex/index.css.ts';

const cssLink = `<link href="${css}" rel="stylesheet">`;
const head = document.querySelector('head');
if (head) {
  head.insertAdjacentHTML('afterbegin', cssLink);
}
