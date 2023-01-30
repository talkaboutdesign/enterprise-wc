import { appendStyleSheets } from '../../../../scripts/append-stylesheets.ts';
import switchStyles from '../ids-switch.scss';
import layoutStyles from '../../ids-layout-grid/ids-layout-grid.scss';
import textStyles from '../../ids-text/ids-text.scss';

appendStyleSheets(
  switchStyles,
  layoutStyles,
  textStyles
);
