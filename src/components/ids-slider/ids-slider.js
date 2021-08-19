import {
  IdsElement,
  customElement,
  scss,
  mix,
  attributes
} from '../ids-base';

// Import Mixins
import {
  IdsEventsMixin,
  IdsThemeMixin
} from '../ids-mixins';

import styles from './ids-slider.scss';

const TYPES = [
  'single',
  'double',
  'step',
  'vertical'
]

const DEFAULT_VALUE = 50;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_TYPE = TYPES[0];

/**
 * IDS Slider Component
 * @type {IdsSlider}
 * @inherits IdsElement
 * @mixes IdsEventsMixin
 * @mixes IdsThemeMixin
 */
@customElement('ids-slider')
@scss(styles)
class IdsSlider extends mix(IdsElement).with(IdsEventsMixin, IdsThemeMixin) {
  constructor() {
    super();

    this.slider = this.container.querySelector('.slider');
    this.trackArea = this.container.querySelector('.track-area');
    this.thumb = this.container.querySelector('.thumb');
    this.thumbDraggable = this.container.querySelector('.thumb-draggable');
  }


  
  connectedCallback() {
    this.#handleEvents();
    super.connectedCallback();
  }

  /**
   * Return the attributes we handle as getters/setters
   * @returns {Array} The attributes in an array
   */
  static get attributes() {
    return [
      attributes.TYPE,
      attributes.COLOR,
      attributes.TOOLTIP,
      // attributes.VALUE,
      'valuea',
      'valueb',
      attributes.MIN,
      attributes.MAX,
      attributes.STEP,
      attributes.LABEL,
    ];
  }

  /**
   * Create the Template for the contents
   * @returns {string} The template
   */



  template() {
    return `
      <div class="ids-slider">
        <div class="slider">
          <input hidden value="${this.valuea ?? DEFAULT_VALUE}" min="${this.min ?? DEFAULT_MIN}" max="${this.max ?? DEFAULT_MAX}"></input>
          <div class="track-area">
            <ids-draggable class="thumb-draggable" axis="x" parent-containment>
              <div class="thumb">
                <div class="tooltip">
                  <ids-text class="text">${this.valuea ?? DEFAULT_VALUE}</ids-text>
                  <div class="pin"></div>
                </div>
              </div>
            </ids-draggable>
          </div>
          <div class="track"></div>
          <div class="tick-container end">
            <span class="tick"></span>
          </div>
          <div class="tick-container start">
            <span class="tick"></span>
          </div>
          <ids-text label class="label min">${this.min ?? DEFAULT_MIN}</ids-text>
          <ids-text label class="label max">${this.max ?? DEFAULT_MAX}</ids-text>
        </div>
      </div>
    `;
  }

  updateUI() {
    // console.log('updating UI');

    const range = this.max - this.min;

    // if (this.type === 'single') {
    //   console.log('type is single')
      
    //   this.container.querySelector('.slider:nth-of-type(1)').style.setProperty("--percentStart", 0);
    //   this.container.querySelector('.slider:nth-of-type(1)').style.setProperty("--percentEnd", percentA);
    // }
    
    // if (this.type === 'double') {
    //   console.log('type is double')
    //   const percentB = (this.valueb - this.min) / range * 100;
      // const percentA = (Math.ceil(this.valuea) - this.min) / range * 100;
      
      // const tooltipPosA = -10 - (percentA * 0.01);
      // const tooltipPosA = -12 - (percentA * 0.16);
    //   const tooltipPosB = -10 - (percentB * 0.2);
      
    //   console.log('percentB: ' + percentB);
    //   console.log('percentA: ' + percentA);
  
    //   // A
    //   this.container.querySelector('.slider:nth-of-type(1)').setAttribute('value', this.valuea);
    
    //   this.container.querySelector('.slider:nth-of-type(1)').style.setProperty("--percentStart", Math.min(percentB, percentA));
    //   this.container.querySelector('.slider:nth-of-type(1)').style.setProperty("--percentEnd", Math.max(percentB, percentA));
    
      // this.container.querySelector('.tooltip:nth-of-type(1)').style.setProperty("--percent", percentA);
      // this.container.querySelector('.tooltip:nth-of-type(1)').style.setProperty("--pos", tooltipPosA);
    
      this.container.querySelector('.tooltip:nth-of-type(1) .text').innerHTML = Math.ceil(this.valuea);
      
    //   // B
    //   // binding
    //   this.container.querySelector('.slider:nth-of-type(2)').setAttribute('value', this.valueb);
      
    //   // progress color track
    //   this.container.querySelector('.slider:nth-of-type(2)').style.setProperty("--percentStart", Math.min(percentB, percentA));
    //   this.container.querySelector('.slider:nth-of-type(2)').style.setProperty("--percentEnd", Math.max(percentB, percentA));
    
    //   // tooltip positioning
    //   this.container.querySelector('.tooltip:nth-of-type(2)').style.setProperty("--percent", percentB);
    //   this.container.querySelector('.tooltip:nth-of-type(2)').style.setProperty("--pos", tooltipPosB);
      
    //   this.container.querySelector('.tooltip:nth-of-type(2) .text').innerHTML = this.valueb;
    // }
    
  }

  set valueb(value) {
    this.setAttribute('valueb', value || DEFAULT_MAX);
    this.updateUI();
  }
  
  get valueb() { return this.getAttribute('valueb') || DEFAULT_MAX; }
  
  set valuea(value) {
    this.setAttribute('valuea', value || DEFAULT_VALUE);
    this.updateUI();
  }

  get valuea() { return this.getAttribute('valuea') || DEFAULT_VALUE; }

  set min(value) {
    this.setAttribute(attributes.MIN, value || DEFAULT_MIN);
    this.container.querySelector('.label .min').innerHTML = this.min;
  }

  get min() { return this.getAttribute(attributes.MIN) || DEFAULT_MIN; }

  set max(value) {
    this.setAttribute(attributes.MAX, value || DEFAULT_MAX);
    this.container.querySelector('.label .max').innerHTML = this.max;
  }

  get max() { return this.getAttribute(attributes.MIN) || DEFAULT_MAX; }

  set type(value) {
    if (value && TYPES.includes(value)) {
      this.setAttribute(attributes.TYPE, value);

      // if (value === 'single') {
      //   this.container.querySelector('.tooltip:nth-of-type(2)').remove();
      //   this.container.querySelector('.slider:nth-of-type(2)').remove();
      // }
    } else {
      this.setAttribute(attributes.TYPE, DEFAULT_TYPE);
    }
  }
  
  get type() { return this.getAttribute(attributes.TYPE)}

  /**
   * Set the color of the bar
   * @param {string} value The color value, this can be a hex code with the #
   */
  set color(value) {
    this.setAttribute(attributes.COLOR, value);
    // this.#updateColor();
  }

  get color() { return this.getAttribute(attributes.COLOR); }

  set hideTooltipA(value) {
      this.container.querySelector('.tooltip:nth-of-type(1)').style.opacity = value ? 0 : 1;
  }

  set hideTooltipB(value) {
      // this.container.querySelector('.tooltip:nth-of-type(2)').style.opacity = value ? 0 : 1;
    }
    
    calculateUI(x, y) {  
    // const slider = this.container.querySelector('.slider');
    // const trackArea = this.container.querySelector('.track-area');
    // const thumb = this.container.querySelector('.thumb');
    // const thumbDraggable = this.container.querySelector('.thumb-draggable');
    const slider = this.slider;
    const trackArea = this.trackArea;
    const thumb = this.thumb;
    const thumbDraggable = this.thumbDraggable;

    const bounds = [
      slider.offsetTop + trackArea.offsetTop, // top 0
      slider.offsetTop - trackArea.offsetTop, // bottom 1
      slider.offsetLeft, // left 2
      slider.offsetLeft + trackArea.clientWidth, // right 3
    ];


    const clickedTrackArea = y >= bounds[0] && y < bounds[1] && x > bounds[2] && x < bounds[3];
    

    // for single
    if (clickedTrackArea) {
      const percent = this.calcPercentFromX(x, bounds[2], bounds[3], thumbDraggable.clientWidth);
      // console.log('percent: ' + percent + '%')

      // const xTranslate = Math.ceil(percent) / 100 * (bounds[3] - bounds[2]);
      const xTranslate = this.calcTranslateFromPercent(bounds[2], bounds[3], percent);
      console.log('translate x by: ' + xTranslate);

      // console.log('xPos: ' + xPos);
      // console.log(xResult);
      this.container.querySelector('.thumb-draggable').style.transform = `translate(${xTranslate}px, 0px)`;

      const value = this.calcValueFromPercent(percent);
      // console.log('value: ' + value);
      this.setAttribute('valuea', value);
    }
  }

  calcValueFromPercent(percent) {
    return percent / 100 * this.max;
  }

  calcTranslateFromPercent(xStart, xEnd, percent) {
    // const percent = this.calcPercentFromX(x, xStart, xEnd, thumbWidth);
    const xCoord = Math.ceil(percent) / 100 * (xEnd - xStart);
    // the higher the number, the smoother the thumb will match the right position when moving towards 100% 
    const refinement = 100;
    // this is to account for the fact that the top left corner of the thumb gets translated
    // --thus it will be outside of the track if we translate it to the last pixel
    // .16 because the thumb is 16 pixels large
    const xPos = refinement*(percent * -.16/refinement);
    const xTranslate = xCoord + xPos;
    return xTranslate;
  }

  calcPercentFromX(x, xStart, xEnd, thumbWidth) {
    // if x < thumbWidth/2 or x > xEnd - thumbWidth / 2
    let percent = 0;
    if (x - xStart < thumbWidth/2) {
      percent = 0;
    }
    else if (x - xStart > xEnd - thumbWidth/2) {
      percent = 100;
    } else {
      percent = (x - xStart - thumbWidth/2) / (xEnd - thumbWidth/2 - xStart) * 100 // +/- 2% for the ticks/edges
    }
    return percent;
  }

  #handleEvents() {

    // when dragging thumb, show tool tip, change value(s)
    // when ids-slider clicked, show tool tip
    // when clicked outside, hide tool tip

    const thumbDraggable = this.container.querySelector('.thumb-draggable');

    // Listen for drag event on draggable thumb
    // TODO: change to onEvent
    thumbDraggable.addEventListener('ids-drag', (e) => {
      const slider = this.slider;
      const trackArea = this.trackArea;
      const thumbDraggable = this.thumbDraggable;

      // TODO: use e.detail.translateX instead of parsing the style string
      // const transformString = e.target.style.transform;
      // const translateX = transformString.split('(')[1].split('p')[0];
      this.hideTooltipA = false;

      const x = e.pageX;
      console.log(x);
      const bounds = [
        slider.offsetLeft, // left 0
        slider.offsetLeft + trackArea.clientWidth, // right 1
      ];
      console.log(bounds)

      const percent = this.calcPercentFromX(x, bounds[0], bounds[1], thumbDraggable.clientWidth);
      console.log('percent: ' + percent);
      const value = this.calcValueFromPercent(percent);
      console.log('value: ' + value);
      // this.setAttribute('valuea', value);
    });
    
    // Listen for click events
    // TODO: change to onEvent
    // check if click landed on ids-slider or outside of it
    window.addEventListener('click', (event) => {
      const idsSliderSelected = event.target.name === 'ids-slider';
      console.log('slider selected :' + idsSliderSelected);

  
      console.log(event.clientX + ", " + event.clientY)
      this.hideTooltipA = !idsSliderSelected;
      this.calculateUI(event.clientX, event.clientY);

    //   if (this.type === 'double') {
    //     this.hideTooltipB = !idsSliderSelected;
    //   }

    //   // shadow styles for single
    //   if (this.type === 'single') {
    //     if (idsSliderSelected) {
    //       this.container.querySelector('.slider:hover').style.removeProperty('box-shadow')
    //       this.container.querySelector('.slider').style.setProperty('--hover-shadow', 'rgb(0 114 237 / 10%) 0px 0px 0px 8px')
    //       this.container.querySelector('.slider').style.setProperty('--focus-shadow', 'rgb(0 114 237 / 10%) 0px 0px 0px 8px')
    //     } else {
    //       this.container.querySelector('.slider').style.setProperty('--focus-shadow', '');
    //       this.container.querySelector('.slider').style.setProperty('--hover-shadow', '0 2px 5px rgb(0 0 0 / 20%)');
    //     }
    //   }
    })
    return this;
  }
}

export default IdsSlider;
