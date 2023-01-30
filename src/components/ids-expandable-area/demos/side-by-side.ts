import '../ids-expandable-area.ts';
import '../../ids-data-label/ids-data-label.ts';

// Supporting components
import '../../ids-input/ids-input.ts';
import '../../ids-toggle-button/ids-toggle-button.ts';
import '../../ids-hyperlink/ids-hyperlink.ts';

document.addEventListener('DOMContentLoaded', () => {
  // Add an event listener to test clickable links
  document.querySelectorAll('ids-toggle-button').forEach((idsButton) => {
    idsButton.addEventListener('click', (e: any) => {
      e.target.toggle();
    });
  });
});

// Initialize the 4.x
$('body').initialize();
$('body').on('initialized', () => {
  $('#expandable-area-1').expandablearea({
    attributes: [{
      name: 'id',
      value: 'expandablearea-id-1'
    },
    {
      name: 'data-automation-id',
      value: 'expandablearea-automation-id-1'
    }
    ]
  });

  $('#expandable-area-2').expandablearea({
    attributes: [{
      name: 'id',
      value: 'expandablearea-id-2'
    },
    {
      name: 'data-automation-id',
      value: 'expandablearea-automation-id-2'
    }
    ]
  });

  $('#expandable-area-3').expandablearea({
    attributes: [{
      name: 'id',
      value: 'expandablearea-id-3'
    },
    {
      name: 'data-automation-id',
      value: 'expandablearea-automation-id-3'
    }
    ]
  });

  $('#expandable-area-4').expandablearea({
    attributes: [{
      name: 'id',
      value: 'expandablearea-id-4'
    },
    {
      name: 'data-automation-id',
      value: 'expandablearea-automation-id-4'
    }
    ]
  });
});
