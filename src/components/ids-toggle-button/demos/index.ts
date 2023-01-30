// Supporting components
import '../ids-toggle-button.ts';
import '../../ids-button/ids-button.ts';

document.addEventListener('DOMContentLoaded', () => {
  // Add an event listener to test clickable links
  document.querySelectorAll('ids-toggle-button').forEach((idsButton) => {
    idsButton.addEventListener('click', (e: any) => {
      e.target.toggle();
    });
  });
});
