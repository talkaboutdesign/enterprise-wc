import { appendStyleSheets } from '../../../../scripts/append-stylesheets.ts';
import dataGridStyles from '../ids-data-grid.scss';
import layoutStyles from '../../ids-layout-grid/ids-layout-grid.scss';
import textStyles from '../../ids-text/ids-text.scss';

appendStyleSheets(dataGridStyles, layoutStyles, textStyles);
