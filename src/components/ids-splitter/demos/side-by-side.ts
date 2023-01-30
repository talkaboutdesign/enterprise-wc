import '../ids-splitter.ts';
import css from '../../../assets/css/ids-splitter/side-by-side.css.ts';

const cssLink = `<link href="${css}" rel="stylesheet">`;
(document.querySelector('head') as any).insertAdjacentHTML('afterbegin', cssLink);

// Initialize the 4.x
$('body').initialize();
