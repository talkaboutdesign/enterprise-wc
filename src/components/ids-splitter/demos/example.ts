import css from '../../../assets/css/ids-splitter/index.css.ts';

const cssLink = `<link href="${css}" rel="stylesheet">`;
(document.querySelector('head') as any).insertAdjacentHTML('afterbegin', cssLink);
