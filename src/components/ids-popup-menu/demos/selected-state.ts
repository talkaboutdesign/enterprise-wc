import '../ids-popup-menu.ts';
import '../../ids-menu/ids-menu.ts';
import '../../ids-popup/ids-popup.ts';

document.addEventListener('DOMContentLoaded', () => {
  const popupmenuEl: any = document.querySelector('ids-popup-menu');
  const popupEl = popupmenuEl.popup;

  // Preconfigure the Popup
  popupEl.align = 'top, left';

  // Log to the console on `deselected` (selected events are covered by index.ts)
  popupmenuEl.addEventListener('deselected', (e: any) => {
    console.info(`Item "${e.detail.elem.text}" was deselected`);
  });
});
