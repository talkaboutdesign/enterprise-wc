// Supporting components
import '../ids-card.ts';
import '../../ids-text/ids-text.ts';
import '../../ids-button/ids-button.ts';
import '../../ids-list-view/ids-list-view.ts';
import eventsJSON from '../../../assets/data/events.json';

// Example for populating the List View
const listView = document.querySelector('#demo-card-footer');

// Do an ajax request and apply the data to the list
const url: any = eventsJSON;

const setData = async () => {
  const res = await fetch(url);
  const data = await res.json();
  (listView as any).data = data;
};

setData();
