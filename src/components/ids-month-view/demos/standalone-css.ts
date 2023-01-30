import css from '../../../assets/css/ids-message/standalone-css.css.ts';
import { appendStyleSheets } from '../../../../scripts/append-stylesheets.ts';
import monthViewStyles from '../ids-month-view.scss';
import layoutStyles from '../../ids-layout-grid/ids-layout-grid.scss';
import textStyles from '../../ids-text/ids-text.scss';
import buttonStyles from '../../ids-button/ids-button.scss';

appendStyleSheets(
  monthViewStyles,
  layoutStyles,
  buttonStyles,
  textStyles
);

const cssLink = `<link href="${css}" rel="stylesheet">`;
(document.querySelector('head') as any).insertAdjacentHTML('afterbegin', cssLink);
