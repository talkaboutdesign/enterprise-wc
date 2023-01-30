import { appendStyleSheets } from '../../../../scripts/append-stylesheets.ts';
import tabsStyles from '../ids-tabs.scss';
import tabStyles from '../ids-tab.scss';
import layoutStyles from '../../ids-layout-grid/ids-layout-grid.scss';
import textStyles from '../../ids-text/ids-text.scss';

appendStyleSheets(
  tabsStyles,
  tabStyles,
  layoutStyles,
  textStyles
);
