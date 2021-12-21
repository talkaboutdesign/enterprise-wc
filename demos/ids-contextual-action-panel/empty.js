import IdsContextualActionPanel from '../../src/components/ids-contextual-action-panel/ids-contextual-action-panel';
import IdsButton from '../../src/components/ids-button/ids-button';

document.addEventListener('DOMContentLoaded', () => {
  const triggerId = '#cap-trigger-btn';
  const triggerBtn = document.querySelector(triggerId);
  const cap = document.querySelector('ids-contextual-action-panel');

  // Links the CAP to its trigger button (sets up click/focus events)
  cap.target = triggerBtn;
  cap.trigger = 'click';

  // Disable the trigger button when showing the CAP.
  cap.addEventListener('beforeshow', () => {
    triggerBtn.disabled = true;
    return true;
  });

  // Close the modal when its inner buttons are clicked
  // (this can be in the standard button area, OR inside a Toolbar)
  cap.onButtonClick = () => {
    cap.hide();
  };

  // After the modal is done hiding, re-enable its trigger button.
  cap.addEventListener('hide', () => {
    triggerBtn.disabled = false;
  });
});