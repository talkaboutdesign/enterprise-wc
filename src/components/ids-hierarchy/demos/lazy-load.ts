// Supporting components
import '../ids-hierarchy.ts';
// eslint-disable-next-line no-unused-vars
import '../ids-hierarchy-item.ts';
import '../ids-hierarchy-legend.ts';
// eslint-disable-next-line no-unused-vars
import '../ids-hierarchy-legend-item.ts';
import headshot from '../../../assets/images/headshot-1.jpg.ts';
import hierarchyJSON from '../../../assets/data/hierarchy.json';

const headshotImg: any = window.document.getElementById('headshot');
headshotImg.src = headshot;

const hierarchyLazyItem: any = document.querySelector('ids-hierarchy-item');
if (hierarchyLazyItem) {
  hierarchyLazyItem.hasChildren = true;
  hierarchyLazyItem.loadChildren = async function loadChildren() {
    const url: any = hierarchyJSON;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };
}
