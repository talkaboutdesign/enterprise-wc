// Supporting components
import '../ids-toolbar.ts';
import '../../ids-button/ids-button.ts';
import '../../ids-input/ids-input.ts';
import '../../ids-menu-button/ids-menu-button.ts';
import '../../ids-popup-menu/ids-popup-menu.ts';

document.addEventListener('DOMContentLoaded', () => {
  const btnFontpicker: any = document.querySelector('#btn-fontpicker');
  btnFontpicker?.menuEl.popup.addEventListener('selected', (e: CustomEvent) => {
    btnFontpicker.text = e.detail.elem.text;
  });
});
