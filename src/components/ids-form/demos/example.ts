import '../../ids-button/ids-button.ts';
import '../../ids-dropdown/ids-dropdown.ts';
import '../../ids-checkbox/ids-checkbox.ts';
import '../../ids-textarea/ids-textarea.ts';
import '../../ids-color-picker/ids-color-picker.ts';
import '../../ids-date-picker/ids-date-picker.ts';
import '../../ids-lookup/ids-lookup.ts';
import '../../ids-radio/ids-radio.ts';
import '../../ids-search-field/ids-search-field.ts';
import '../../ids-spinbox/ids-spinbox.ts';
import '../../ids-switch/ids-switch.ts';
import '../../ids-time-picker/ids-time-picker.ts';
import '../../ids-upload/ids-upload.ts';

const form = (document.querySelector('#sample-form') as any);
const toggleCompactBtn = (document.querySelector('#btn-toggle-compact') as any);

form.addEventListener('submit', (e: CustomEvent) => {
  form.checkValidation();
  console.info(`Form Submitted`, e.detail, form.isValid);
});

toggleCompactBtn?.addEventListener('click', () => {
  form?.setAttribute('compact', !form?.compact);
});
