// Supporting components
import '../ids-menu-header.ts';
import '../ids-menu-item.ts';
import '../ids-menu-group.ts';
import '../../ids-separator/ids-separator.ts';

// Initialize the 4.x
document.addEventListener('DOMContentLoaded', () => {
  $('body').initialize();
  $('#popupmenu-trigger').popupmenu();
});
