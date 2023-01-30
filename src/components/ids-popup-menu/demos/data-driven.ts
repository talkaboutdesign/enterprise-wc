// Supporting components
import '../ids-popup-menu.ts';
import '../../ids-popup/ids-popup.ts';
import json from '../../../assets/data/menu-contents.json';

document.addEventListener('DOMContentLoaded', () => {
  const popupmenuEl: any = document.querySelector('#popupmenu');

  // Configure the menu
  const popupEl = popupmenuEl.popup;

  // Load/set data
  const url: any = json;
  const setData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    popupmenuEl.data = data;
    popupEl.align = 'top, left';
  };

  setData();
});
