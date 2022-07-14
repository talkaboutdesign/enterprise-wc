import { attributes } from '../../core/ids-attributes';
import { customElement, scss } from '../../core/ids-decorators';
import { injectTemplate, stringToBool } from '../../utils/ids-string-utils/ids-string-utils';
import { QUALITATIVE_COLORS } from './ids-chart-colors';
import { patternData } from './ids-pattern-data';
import NiceScale from './ids-nice-scale';
import debounce from '../../utils/ids-debounce-utils/ids-debounce-utils';
import Base from './ids-axis-chart-base';
import IdsDataSource from '../../core/ids-data-source';
import '../ids-tooltip/ids-tooltip';
import '../ids-empty-message/ids-empty-message';
import styles from './ids-axis-chart.scss';

type IdsChartData = {
  abbreviatedName?: string,
  name?: string,
  value?: number,
  shortName?: string,
  color?: string,
  data?: Array<IdsChartData>,
  pattern?: string,
  patternColor?: string
};

type IdsChartPointData = {
  left: number,
  top: number,
  value: number,
  color?: string
};

type IdsChartMarkerData = {
  /** The number of markers (dots ect) */
  markerCount: number,
  /** The min value in all groups */
  min: number,
  /** The max value in all groups */
  max: number,
  /** The max value in all groups */
  groupCount?: number,
  /** The scale calculations */
  scale: NiceScale,
  /** The y scale values */
  scaleY?: Array<number>,
  /** The point data in the group */
  points?: Array<IdsChartData>,
  /** The location of the top of the grid */
  gridTop: number,
  /** The location of the bottom of the grid */
  gridBottom: number,
  /** The location of the left of the grid */
  gridLeft: number,
  /** The location of the right of the grid */
  gridRight: number
  /** The total within each group */
  groupTotals: Array<number>
};

type IdsChartDimensions = {
  left: number,
  right: number,
  top: number,
  bottom: number
};

/**
 * IDS Axis Chart Component
 * @type {IdsAxisChart}
 * @inherits IdsElement
 * @mixes IdsChartSelectionMixin
 * @mixes IdsEventsMixin
 * @part container - the outside container element
 * @part chart - the svg outer element
 */
@customElement('ids-axis-chart')
@scss(styles)
export default class IdsAxisChart extends Base {
  constructor() {
    super();

    // Setup the default values
    this.state = {};
    this.state.yAxisFormatter = {
      notation: 'compact',
      compactDisplay: 'short'
    };
  }

  /** Reference to datasource API */
  datasource = new IdsDataSource();

  /**
   * @returns {Array<string>} Drawer vetoable events
   */
  vetoableEventTypes = [
    'beforeselected',
    'beforedeselected'
  ];

  /**
   * On selectable change
   */
  onSelectableChange(): void {
    this.legendsClickable?.(this.selectable);
  }

  /**
   * Invoked each time the custom element is appended
   */
  connectedCallback(): void {
    this.svg = this.shadowRoot.querySelector('svg');
    this.emptyMessage = this.querySelector('ids-empty-message') || this.shadowRoot.querySelector('ids-empty-message');
    this.legend = this.shadowRoot.querySelector('[name="legend"]');
    this.#attachEventHandlers();
    this.rerender();
    super.connectedCallback?.();
  }

  /**
   * Invoked each time the custom element is removed
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#resizeObserver?.disconnect();
    this.#resizeObserver = undefined;
  }

  /**
   * Return the attributes we handle as getters/setters
   * @returns {Array} The attributes in an array
   */
  static get attributes(): Array<string> {
    return [
      ...super.attributes,
      attributes.ANIMATED,
      attributes.ALIGN_X_LABELS,
      attributes.DATA,
      attributes.GROUPED,
      attributes.HEIGHT,
      attributes.MARGINS,
      attributes.SHOW_HORIZONTAL_GRID_LINES,
      attributes.SHOW_VERTICAL_GRID_LINES,
      attributes.STACKED,
      attributes.TITLE,
      attributes.WIDTH
    ];
  }

  /**
   * Create the Template for the contents
   * @returns {string} The template
   */
  template(): string {
    return `<div class="ids-chart-container" part="container">
      <svg class="ids-axis-chart" part="chart" width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">
      </svg>
      <slot name="legend">
      </slot>
      <slot name="empty-message">
        <ids-empty-message icon="empty-no-data" hidden>
          <ids-text type="h2" font-size="20" label="true" slot="label">${this.locale?.translate('NoData') || 'No Data Available'}</ids-text>
        </ids-empty-message>
      </slot>
      <slot name="tooltip">
        <ids-tooltip id="tooltip"></ids-tooltip>
      </slot>
    </div>`;
  }

  /**
   * Setup the Event Handling
   * @private
   */
  #attachEventHandlers(): void {
    this.onEvent('localechange.about-container', this.closest('ids-container'), async () => {
      this.rerender();
      this.shadowRoot.querySelector('ids-empty-message ids-text').textContent = this.locale?.translate('NoData');
    });

    this.onEvent('languagechange.about-container', this.closest('ids-container'), async () => {
      this.shadowRoot.querySelector('ids-empty-message ids-text').textContent = this.locale?.translate('NoData');
    });
  }

  /** Holds the resize observer object */
  #resizeObserver?: ResizeObserver = undefined;

  /**
   * Attach the resize observer
   * @private
   */
  #attachResizeObserver(): void {
    // Set observer for resize
    if ((this.resizeToParentHeight || this.resizeToParentWidth) && !this.#resizeObserver) {
      this.parentWidth = this.parentElement.offsetWidth;
      this.parentHeight = this.parentElement.offsetHeight;
      this.#resizeObserver = new ResizeObserver(debounce((entries: ResizeObserverEntry[]) => {
        this.resize(entries);
      }, 350));
      this.#resizeObserver.disconnect();
      this.#resizeObserver.observe(this.parentElement);
    }
  }

  /**
   * Handle Resizing
   * @private
   * @param {object} entries The resize observer entries
   */
  resize(entries: ResizeObserverEntry[]): void {
    if (!this.initialized) {
      return;
    }

    if ((entries[0].contentRect.width !== this.parentWidth && this.resizeToParentWidth && this.parentWidth > 0)
      || (entries[0].contentRect.height !== this.parentHeight && this.resizeToParentHeight && this.parentHeight > 0)) {
      this.initialized = false;
      if (this.resizeToParentHeight) {
        this.height = 'inherit';
      }
      if (this.resizeToParentWidth) {
        this.width = 'inherit';
      }
      this.initialized = true;
      this.rerender();
      this.reanimate();
    }

    this.parentWidth = this.parentElement.offsetWidth;
    this.parentHeight = this.parentElement.offsetHeight;
  }

  /**
   * Redraw the chart
   * @private
   */
  rerender(): void {
    if (!this.initialized) {
      return;
    }

    if (this.data && this.data.length === 0 && this.initialized) {
      this.#showEmptyMessage();
      this.legend.innerHTML = this.legendTemplate();
      return;
    }

    this.#calculate();
    this.#addColorVariables();
    this.svg.innerHTML = this.#axisTemplate();
    this.legend.innerHTML = this.legendTemplate();

    this.adjustLabels();
    this.legendsClickable?.(this.selectable);

    // Completed Event and Callback
    this.triggerEvent('rendered', this, { svg: this.svg, data: this.data, markerData: this.markerData });
    if (this.rendered) {
      this?.rendered();
    }
  }

  /** The marker data to use to draw the chart */
  markerData: IdsChartMarkerData = {
    markerCount: 0,
    groupCount: 0,
    min: 0,
    max: 0,
    scale: new NiceScale(this.yAxisMin, 0),
    gridTop: 0,
    gridBottom: 0,
    gridLeft: 0,
    gridRight: 0,
    groupTotals: [0],
  };

  /**
   * Get the min/max points and calculate the scale
   * @private
   */
  #calculate(): void {
    let groupCount = 0;
    let markerCount = 0;
    this.markerData = {
      markerCount: 0,
      groupCount: 0,
      min: 0,
      max: 0,
      scale: new NiceScale(this.yAxisMin, 0),
      gridTop: 0,
      gridBottom: 0,
      gridLeft: 0,
      gridRight: 0,
      groupTotals: [0],
    };

    // Get the Min and Max and Totals in one sequence
    this.data?.forEach((group: any, index: number) => {
      groupCount++;
      markerCount = 0;
      this.markerData.groupTotals[index] = 0;

      group.data?.forEach((data: any) => {
        if (data.value > this.markerData.max) {
          this.markerData.max = data.value;
        }
        this.markerData.groupTotals[index] += data.value;
        if (data.value < this.markerData.min) {
          this.markerData.min = data.value;
        }
        if (this.markerData.min === undefined) {
          this.markerData.min = data.value;
        }
        markerCount++;
      });
      if (markerCount > this.markerData.markerCount) {
        this.markerData.markerCount = markerCount;
      }
      this.markerData.groupCount = groupCount;
    });

    // Calculate a Nice Scale
    const groupMax = Math.max(...this.markerData.groupTotals);
    const scale: NiceScale = new NiceScale(this.yAxisMin, this.stacked ? groupMax : this.markerData.max);
    this.markerData.scale = scale;
    this.markerData.scaleY = [];
    for (let i = (scale.niceMin || 0); i <= (scale.niceMax); i += (scale.tickSpacing || 0)) {
      this.markerData.scaleY.push(i);
    }

    // Calculate the Data Points / Locations
    this.markerData.points = [];
    this.data?.forEach((dataPoints: IdsChartData) => {
      let left: number = this.textWidths.left + this.margins.left + (this.margins.leftInner * 2);
      const points: Array<IdsChartPointData> = [];
      for (let index = 0; index < this.markerData.markerCount; index++) {
        left = index === 0 ? left : left + this.#xLineGap();

        const value = dataPoints.data && dataPoints.data[index] ? (dataPoints.data[index].value || 0) : 0;
        this.markerData.gridTop = this.margins.top + this.textWidths.top;
        this.markerData.gridBottom = Number(this.height) - this.margins.bottom - this.textWidths.bottom;
        this.markerData.gridLeft = this.textWidths.left + this.margins.left
          + (this.margins.leftInner * 2) + this.margins.rightInner;
        this.markerData.gridRight = Number(this.width) - this.margins.right - this.textWidths.right;

        // y = (value - min) / (max - min)
        const cyPerc = ((value - (this.markerData.scale.niceMin || 0))
          / (this.markerData.scale.niceMax - this.markerData.scale.niceMin));
        const cyHeight = (cyPerc * (this.markerData.gridBottom - this.markerData.gridTop));
        points.push({ left, top: this.markerData.gridBottom - cyHeight, value });
      }
      this.markerData.points?.push(points as any);
    });

    // Calculate the width of each category section (used in other places)
    this.sectionWidth = (this.markerData.gridRight - this.markerData.gridLeft) / this.markerData.markerCount;
    let left = this.textWidths.left + this.margins.left + (this.margins.leftInner * 2);
    this.sectionWidths = [];
    for (let index = 0; index < this.markerData.markerCount + 1; index++) {
      this.sectionWidths.push({ left, width: this.sectionWidth });
      left += this.sectionWidth;
    }
  }

  /**
   * Add colors in a style sheet to the root so the variables can be used
   * @private
   */
  #addColorVariables(): void {
    let colorSheet = '';
    if (!this.shadowRoot.styleSheets) {
      return;
    }

    this.data?.forEach((group: IdsChartData, index: number) => {
      const data = (group as any);
      let color = data.patternColor;
      if (!color && data.color && data.color.substr(0, 1) === '#') {
        color = data.color;
      }
      if (!color && data.color && data.color.substr(0, 1) !== '#') {
        color = `var(--ids-color-palette-${data.color})`;
      }
      if (!color) {
        color = `var(${this.colors[index]})`;
      }
      colorSheet += `--ids-chart-color-${index + 1}: ${color} !important;`;
    });

    const styleSheet = this.shadowRoot.styleSheets[0];
    if (styleSheet.cssRules && styleSheet.cssRules[0].selectorText === ':host') {
      styleSheet.deleteRule(0);
    }
    styleSheet.insertRule(`:host {
      ${colorSheet}
    }`);
  }

  /**
   * Return the insider part of the SVG
   * @private
   * @returns {string} The SVG markup
   */
  #axisTemplate(): string {
    return `<title></title>
    <title>${this.title}</title>
    <defs>
      ${this.#patterns()}
    </defs>
    <g class="grid vertical-lines${!this.showVerticalGridLines ? ' hidden' : ''}">
      ${this.#verticalLines()}
    </g>
    <g class="grid horizontal-lines${!this.showHorizontalGridLines ? ' hidden' : ''}">
      ${this.#horizonatalLines()}
    </g>
    ${this.chartTemplate()}
    <g class="labels x-labels">
      ${this.#xLabels()}
    </g>
    <g class="labels y-labels">
      ${this.#yLabels()}
    </g>
    `;
  }

  /**
   * Overridable method to draw the markers
   * @returns {string} The SVG Marker Markup
   */
  chartTemplate(): string {
    return '';
  }

  /**
   * Child Chart elements that get tooltips
   * @private
   * @returns {Array<SVGElement>} The elements
   */
  tooltipElements(): Array<SVGElement> {
    return [];
  }

  /**
   * Overridable method to draw to get the tooltip template
   * @returns {string} The tooltip template
   */
  tooltipTemplate(): string {
    // eslint-disable-next-line no-template-curly-in-string
    return '<b>${label}</b> ${value}';
  }

  /**
   * Setup handlers on tooltip elements
   */
  attachTooltipEvents(): void {
    // Need one event per bar due to the nature of the events for tooltip
    this.tooltipElements().forEach((element: SVGElement) => {
      this.onEvent('hoverend', element, async () => {
        const tooltip = this.container.querySelector('ids-tooltip');
        tooltip.innerHTML = this.#tooltipContent(element);
        tooltip.target = element;
        tooltip.placement = 'top';
        tooltip.visible = true;
      });
    });
  }

  /**
   * Return the data for a tooltip accessible by index
   * @param {number} index the data groupIndex
   * @param {number} groupIndex the data index
   * @returns {Array<string>} The elements
   */
  tooltipData(index: number, groupIndex = 0) {
    const data = (this.data as any)[groupIndex]?.data;

    return {
      label: data[index]?.name || (this.data as any)[0].data[index].name,
      value: data[index]?.value || 0,
      tooltip: data[index]?.tooltip
    };
  }

  /**
   * Return the tooltip content
   * @param {SVGElement} elem The svg element we will inspect for content
   * @private
   * @returns {string} The tooltip content
   */
  #tooltipContent(elem: SVGElement): string {
    const group = Number(elem.getAttribute('group-index'));
    const index = Number(elem.getAttribute('index'));
    const data = this.tooltipData(index, group);

    if (data.tooltip) {
      // eslint-disable-next-line no-template-curly-in-string
      return data.tooltip.replace('${value}', data.value).replace('${label}', data.label);
    }

    if (this.stacked) {
      let html = `<div class="tooltip-center"><b>${data.label}</b></div><div class="tooltip chart-legend">`;
      for (let i = 0; i < this.data.length; i++) {
        const dataGroup = this.data[i];
        const label = dataGroup.name;
        const value = (this.data as any)[i].data[index]?.value;
        const colorClass = dataGroup.pattern ? '' : ` color-${i + 1}`;
        const patternSvg = dataGroup.pattern ? `<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><rect width="12" height="12" fill="url(#${dataGroup.pattern})"></rect></svg>` : '';

        if (label && value) {
          html += `<div class="tooltip-row">
            <div class="swatch${colorClass}">${patternSvg}</div>
            <span>${this.data[i].name}</span>
            <b>${(this.data as any)[i].data[index].value}</b></div>`;
        }
      }
      return `${html}</div>`;
    }
    return injectTemplate(this.tooltipTemplate(), data);
  }

  /**
   * Return the y line data for the svg
   * @private
   * @returns {string} The y line markup
   */
  #horizonatalLines(): string {
    let lineHtml = '';
    let top = 0;
    const left = this.textWidths.left + this.margins.left + this.margins.leftInner;
    const width = Number(this.width) - this.margins.right;

    this.markerData.scaleY?.forEach(() => {
      top = top === 0 ? this.margins.top + this.margins.topInner : top + this.#yLineGap();
      lineHtml += `<line x1="${left}" x2="${width}" y1="${top}" y2="${top}"></line>`;
    });

    return lineHtml;
  }

  /**
   * Return the x line data for the svg
   * @private
   * @returns {string} The x line markup
   */
  #verticalLines(): string {
    let lineHtml = '';
    let left = this.textWidths.left + this.margins.left + (this.margins.leftInner * 2);
    const height = Number(this.height) - this.margins.bottom - this.textWidths.bottom;

    for (let index = 0; index < this.markerData.markerCount; index++) {
      left = index === 0 ? left : left + this.#xLineGap();
      lineHtml += `<line x1="${left}" x2="${left}" y1="${this.margins.top}" y2="${height}"></line>`;
    }
    return lineHtml;
  }

  /**
   * Return the y label data for the svg
   * @private
   * @returns {string} The y label markup
   */
  #yLabels(): string {
    let lineHtml = '';
    let top = 0;
    // 3 is the half height of the text - could figure this out based on font size?
    const textHeight = 3;
    const left = this.textWidths.left + this.margins.left;

    this.markerData.scaleY?.slice().reverse().forEach((value: any) => {
      top = top === 0 ? this.margins.top + textHeight : top + this.#yLineGap();
      lineHtml += `<text x="${left}" y="${top}" aria-hidden="true">${this.formatYLabel(value)}</text>`;
    });

    return lineHtml;
  }

  /**
   * Format the value for the x label in a variety of ways
   * @param {string} value The value to format value
   * @returns {string} The formatted value
   * @private
   */
  #formatXLabel(value: string): any {
    if (!this.xAxisFormatter) {
      return value;
    }

    if (typeof this.xAxisFormatter === 'function') {
      return this.xAxisFormatter(value, this.data, this);
    }
  }

  /**
   * Format the value for the y label in a variety of ways
   * @param {string | Function} value The value to format value
   * @returns {string} The formatted value
   * @private
   */
  formatYLabel(value: string | ((value: unknown, data: Array<IdsChartData>, api: this) => string)) {
    if (!this.yAxisFormatter) {
      return value;
    }

    if (typeof this.yAxisFormatter === 'function') {
      return this.yAxisFormatter(value, this.data, this);
    }
    return new Intl.NumberFormat(this.locale?.locale?.name || 'en', this.yAxisFormatter).format(value as any);
  }

  /**
   * Return the x label data for the svg
   * @private
   * @returns {string} The x label markup
   */
  #xLabels(): string {
    let labelHtml = '';
    let left = this.textWidths.left + this.margins.left + (this.margins.leftInner * 2);
    const height = Number(this.height) - this.margins.top - this.margins.bottom + this.margins.bottomInner;

    for (let index = 0; index < this.markerData.markerCount; index++) {
      const value = this.#formatXLabel((this.data as any)[0]?.data[index]?.name);
      left = index === 0 ? left : left + (this.alignXLabels === 'middle' ? this.sectionWidths[index].width : this.#xLineGap());
      if (this.alignXLabels === 'middle') {
        labelHtml += `<text x="${left + (this.sectionWidths[index].width / 2)}" y="${height}" alignment-baseline="middle" text-anchor="middle" aria-hidden="true">${value}</text>`;
      } else {
        labelHtml += `<text x="${left}" y="${height}" aria-hidden="true">${value}</text>`;
      }
    }
    return labelHtml;
  }

  /**
   * Return the measurements for the gap on the y axis
   * @private
   * @returns {string} The y gap calculation
   */
  #yLineGap() {
    return ((
      Number(this.height) - this.margins.top - this.margins.bottom - this.textWidths.bottom - this.textWidths.top)
      / ((this.markerData.scaleY as any).length - 1)
    );
  }

  /**
   * Show an empty message with settings configuration
   * @private
   */
  #showEmptyMessage() {
    this.svg.classList.add('hidden');
    this.emptyMessage.style.height = `${this.height}px`;
    this.emptyMessage.removeAttribute('hidden');
  }

  /**
   * Hide the empty message
   * @private
   */
  #hideEmptyMessage() {
    this.svg.classList.remove('hidden');
    this.emptyMessage.style.height = '';
    this.emptyMessage.setAttribute('hidden', '');
  }

  /**
   * Return the measurements for the gap between points on the x axis
   * @private
   * @returns {string} The x gap calculation
   */
  #xLineGap() {
    const left = this.textWidths.left + this.margins.left + this.margins.leftInner;
    const width = Number(this.width) - this.margins.right - (this.margins.rightInner * 2);

    return ((width - left) / (this.markerData.markerCount - 1));
  }

  /**
   * Return the def markup for svg patterns
   * @private
   * @returns {string} The string with all the patterns being used
   */
  #patterns(): string {
    let patternHtml = '';
    this.data?.forEach((group: any, i: number) => {
      let pattern = patternData[group.pattern];
      if (pattern) {
        const color = `${this.color(i)}` || '#000000';
        pattern = pattern.replace('fill="#000000"', `fill="${color}"`);
        patternHtml += pattern;
      }
    });
    return patternHtml;
  }

  /**
   * Sets the chart title
   * @param {string} value The title value
   */
  set title(value) {
    this.setAttribute(attributes.TITLE, value);
    if (this.container?.querySelector(attributes.TITLE)) {
      this.container.querySelector(attributes.TITLE).textContent = value;
    }
  }

  get title() { return this.getAttribute(attributes.TITLE) || ''; }

  /**
   * The width of the chart (in pixels) or 'inherit' from the parent
   * @param {number | string} value The height value
   */
  set height(value: number | string) {
    let height = value;
    if (value === 'inherit') {
      height = this.#getParentDimensions().height;
      this.resizeToParentHeight = true;
      this.#attachResizeObserver();
    }
    this.setAttribute(attributes.HEIGHT, height);
    this.svg.setAttribute(attributes.HEIGHT, height);
    this.rerender();
  }

  get height() { return parseFloat(this.getAttribute(attributes.HEIGHT)) || 500; }

  /**
   * The width of the chart (in pixels) or 'inherit' from the parent
   * @param {number | string} value The width value
   */
  set width(value: number | string) {
    let width = value;
    if (value === 'inherit') {
      width = this.#getParentDimensions().width;
      this.resizeToParentWidth = true;
      this.#attachResizeObserver();
    }
    this.setAttribute(attributes.WIDTH, width);
    this.svg.setAttribute(attributes.WIDTH, width);
    this.#setContainerWidth(Number(width));
    this.rerender();
  }

  get width() { return parseFloat(this.getAttribute(attributes.WIDTH)) || 700; }

  /**
   * Get the parent element's width and height
   * @returns {object} The height and width of the parent element
   */
  #getParentDimensions() {
    const container: any = document.querySelector('ids-container');
    let isHidden = false;
    if (container.hidden) {
      container.hidden = false;
      isHidden = true;
    }
    const dims = {
      width: this.parentElement.offsetWidth || parseInt(this.parentElement.style.width),
      height: this.parentElement.offsetHeight || parseInt(this.parentElement.style.height)
    };

    if (isHidden) {
      container.hidden = true;
    }
    return dims;
  }

  /**
   * Set the container width (for correct legend and sizing)
   * @param {number} value The width value
   */
  #setContainerWidth(value: number) {
    const container = this.container;
    if (container.classList.contains('ids-chart-container')) {
      container.style.width = `${value}px`;
      return;
    }
    container.parentNode.style.width = `${value}px`;
  }

  /**
   * Set the left, right, top, bottom margins
   * @param {object} value The margin values
   */
  set margins(value) {
    this.state.margins = value;
    this.rerender();
  }

  get margins() {
    return this.state?.margins || {
      left: 16,
      right: this.legendPlacement === 'right' ? 150 : 4, // TODO: Calculate this
      top: 16,
      bottom: 12,
      leftInner: 8,
      rightInner: 8,
      topInner: 0,
      bottomInner: 12
    };
  }

  /**
   * Set the width the text labels/axes take up on each side.
   * @param {object} value The margin values
   */
  set textWidths(value) {
    this.state.textWidths = value;
    this.rerender();
  }

  get textWidths(): IdsChartDimensions {
    return this.state.textWidths || {
      left: this.legendPlacement === 'left' ? 34 : 4, // TODO: Calculate this
      right: 0,
      top: 0,
      bottom: 24
    };
  }

  /**
   * Set the data array of the chart
   * @param {Array<unknown>} value The array to use
   */
  set data(value: Array<IdsChartData>) {
    if (value) {
      this.#hideEmptyMessage();
      this.datasource.data = value as any;
      this.initialized = true;
      this.rerender();
      this.reanimate();
      return;
    }
    this.datasource.data = [];
  }

  get data(): Array<IdsChartData> { return this?.datasource?.data || []; }

  /**
   * Set the minimum value on the y axis
   * @param {number} value The value to use
   */
  set yAxisMin(value: number) {
    this.setAttribute(attributes.Y_AXIS_MIN, value);
    this.rerender();
  }

  get yAxisMin(): number { return parseInt(this.getAttribute(attributes.Y_AXIS_MIN)) || 0; }

  /**
   * Show the vertical axis grid lines
   * @param {boolean} value True or false to show the grid lines
   */
  set showVerticalGridLines(value: boolean) {
    this.setAttribute(attributes.SHOW_VERTICAL_GRID_LINES, value);
    this.rerender();
  }

  get showVerticalGridLines(): boolean {
    const value = this.getAttribute(attributes.SHOW_VERTICAL_GRID_LINES);
    if (value) {
      return stringToBool(this.getAttribute(attributes.SHOW_VERTICAL_GRID_LINES));
    }
    return false;
  }

  /**
   * Show the horizontal axis grid lines
   * @param {boolean} value True or false to show the grid lines
   */
  set showHorizontalGridLines(value: boolean) {
    this.setAttribute(attributes.SHOW_HORIZONTAL_GRID_LINES, value);
    this.rerender();
  }

  get showHorizontalGridLines(): boolean {
    const value = this.getAttribute(attributes.SHOW_HORIZONTAL_GRID_LINES);
    if (value) {
      return stringToBool(this.getAttribute(attributes.SHOW_HORIZONTAL_GRID_LINES));
    }
    return true;
  }

  /**
   * Utility function to get the colors series being used in this chart
   * @returns {Array} The colors being used on this instance.
   */
  get colors(): Array<string> {
    return QUALITATIVE_COLORS;
  }

  /**
   * Get the color to use based on the index for sequential and custom colors
   * @param {number} index The current index
   * @returns {string} The color to use
   * @private
   */
  color(index: number): string {
    if (this.data[index].patternColor) {
      return (this.data[index].patternColor as any);
    }
    return `var(${this.data[index].color ? `color-${index + 1}` : this.colors[index]})`;
  }

  /**
   * Set the format on the x axis items
   * @param {Function} value A string with the formatting routine or a function for more customization.
   */
  set xAxisFormatter(value: any) {
    this.state.xAxisFormatter = value;
    this.rerender();
  }

  get xAxisFormatter(): any {
    return this.state.xAxisFormatter;
  }

  /**
   * Set the format on the y axis items
   * @param {string|Function} value A string with the formatting routine or a function for more customization.
   */
  set yAxisFormatter(value: string | ((value: unknown, data: Array<IdsChartData>, api: this) => string)) {
    this.state.yAxisFormatter = value;
    this.rerender();
  }

  get yAxisFormatter(): any {
    return this.state.yAxisFormatter;
  }

  /**
   * Reanimate the chart
   */
  reanimate(): void {
    if (!this.animated || !this.initialized) {
      return;
    }

    requestAnimationFrame(() => {
      this.container.querySelectorAll('animate').forEach((elem: SVGAnimationElement) => {
        if (elem.beginElement) { elem.beginElement(); }
      });
      this.container.querySelectorAll('animateTransform').forEach((elem: SVGAnimationElement) => {
        if (elem.beginElement) { elem.beginElement(); }
      });
    });
  }

  /**
   * Get a reusable snippet to ease the animation
   * @private
   * @returns {string} The reusable snippet
   */
  get cubicBezier(): string {
    return `calcMode="spline" keyTimes="0; 1" keySplines="0.17, 0.04, 0.03, 0.94" begin="0s" dur="${this.animationSpeed}s"`;
  }

  /**
   * Set the animation on/off
   * @param {boolean} value True if animation is on
   */
  set animated(value: boolean) {
    const animated = stringToBool(this.animated);
    this.setAttribute(attributes.ANIMATED, value);
    this.rerender();

    if (animated) {
      this.reanimate();
    }
  }

  get animated(): boolean {
    const animated = this.getAttribute(attributes.ANIMATED);
    if (animated === null) {
      return true;
    }
    return stringToBool(this.getAttribute(attributes.ANIMATED));
  }

  /**
   * Set the animation speed in s
   * @param {number} value The speed in s
   */
  set animationSpeed(value: number) {
    this.setAttribute(attributes.ANIMATION_SPEED, value);
    if (this.animated) {
      this.reanimate();
    }
  }

  get animationSpeed(): number {
    return this.getAttribute(attributes.ANIMATION_SPEED) || 0.8;
  }

  /**
   * Set the x axis label alignment between start, middle and end
   * @param {string} value start, middle or end
   */
  set alignXLabels(value: string) {
    this.setAttribute(attributes.ALIGN_X_LABELS, value);
    this.rerender();
  }

  get alignXLabels(): string {
    return this.getAttribute(attributes.ALIGN_X_LABELS) || 'start';
  }

  /**
   * Stack the data forming a stacked bar chart
   * @param {boolean} value True to stack the data
   */
  set stacked(value: boolean) {
    this.setAttribute(attributes.STACKED, value);
    this.rerender();
  }

  get stacked(): boolean {
    return stringToBool(this.getAttribute(attributes.STACKED)) || false;
  }
}