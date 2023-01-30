import '../ids-card.ts';
import '../../ids-list-view/ids-list-view.ts';
import '../../ids-button/ids-button.ts';
import '../../ids-input/ids-input.ts';
import '../../ids-toolbar/ids-toolbar.ts';
import '../../ids-menu-button/ids-menu-button.ts';
import '../../ids-popup-menu/ids-popup-menu.ts';
import '../../ids-text/ids-text.ts';
import eventsJSON from '../../../assets/data/events.json';

// Import Css
import css from '../../../assets/css/ids-card/toolbar.css.ts';

const cssLink = `<link href="${css}" rel="stylesheet">`;
const head = document.querySelector('head');
if (head) {
  head.insertAdjacentHTML('afterbegin', cssLink);
}

// Example for populating the List View Component
const listView = document.querySelectorAll('ids-list-view');

// Do an ajax request and apply the data to the list
const url: any = eventsJSON;

const setData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  listView.forEach((l: any) => {
    l.data = data;
  });
};

setData();
