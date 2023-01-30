import '../ids-calendar.ts';
import '../../ids-accordion/ids-accordion.ts';
import '../../ids-week-view/ids-week-view.ts';
import '../../ids-month-view/ids-month-view.ts';
import '../../ids-checkbox/ids-checkbox.ts';
import '../../ids-data-label/ids-data-label.ts';
import '../../ids-popup/ids-popup.ts';
import '../../ids-input/ids-input.ts';
import '../../ids-date-picker/ids-date-picker.ts';
import '../../ids-date-picker/ids-date-picker-popup.ts';
import '../../ids-dropdown/ids-dropdown.ts';
import '../../ids-list-box/ids-list-box.ts';
import '../../ids-time-picker/ids-time-picker.ts';
import '../../ids-textarea/ids-textarea.ts';
import '../../ids-demo-app/ids-demo-listing.ts';
import './ids-custom-calendar-event.ts';
import indexYaml from './index.yaml';

const demoListing: any = document.querySelector('ids-demo-listing');
if (demoListing) {
  demoListing.data = indexYaml.examples;
}
