import css from '../../../assets/css/ids-layout-grid/side-by-side.css.ts';

const cssLink = `<link href="${css}" rel="stylesheet">`;
const head = document.querySelector('head');
if (head) {
  head.insertAdjacentHTML('afterbegin', cssLink);
}
