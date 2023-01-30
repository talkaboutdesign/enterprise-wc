// Supporting components
import '../ids-block-grid.ts';
// Listing Page
import '../../ids-demo-app/ids-demo-listing.ts';
import indexYaml from './index.yaml';

import placeHolderImg from '../../../assets/images/placeholder-200x200.png.ts';

// Images
const images = document.querySelectorAll('img');
images.forEach((img) => {
  img.src = placeHolderImg;
});

const demoListing: any = document.querySelector('ids-demo-listing');
if (demoListing) {
  demoListing.data = indexYaml.examples;
}
