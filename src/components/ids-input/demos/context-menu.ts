// Supporting components
import '../../ids-popup-menu/ids-popup-menu.ts';
import '../../ids-popup/ids-popup.ts';

// Standard menu configuration
document.addEventListener('DOMContentLoaded', () => {
  const popupmenuEl: any = document.querySelector('#popupmenu');
  popupmenuEl.popup.align = 'left, top';
  popupmenuEl.addEventListener('selected', (e: any) => {
    console.info(`Item "${e.detail.elem.text}" was selected`);
  });
});
