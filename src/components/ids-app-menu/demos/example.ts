import '../../ids-header/ids-header.ts';

import avatarPlaceholder from '../../../assets/images/avatar-placeholder.jpg.ts';

const avatarImg: any = window.document.getElementById('avatar');
avatarImg.src = avatarPlaceholder;

document.addEventListener('DOMContentLoaded', () => {
  const appMenuDrawer: any = document.querySelector('#app-menu');
  const appMenuTriggerBtn: any = document.querySelector('#app-menu-trigger');

  appMenuDrawer.target = appMenuTriggerBtn;

  appMenuDrawer.addEventListener('selected', (e: CustomEvent) => {
    console.info(`Header "${(e.target as any).textContent.trim()}" was selected.`);
  });
});
