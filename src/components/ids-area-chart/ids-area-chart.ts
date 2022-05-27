import { customElement, scss } from '../../core/ids-decorators';
import '../ids-line-chart/ids-line-chart';
import Base from './ids-area-chart-base';
import styles from './ids-area-chart.scss';

/**
 * IDS Area Chart Component
 * @type {IdsAreaChart}
 * @inherits IdsElement
 * @mixes IdsEventsMixin
 * @part svg - the outside svg element
 * @part marker - the dots/markers in the chart
 * @part line - the lines in the chart
 * @part area - each area element in the chart
 */
@customElement('ids-area-chart')
@scss(styles)
export default class IdsAreaChart extends Base {
  constructor() {
    super();
  }

  /**
   * Return the chart data for the internal svg
   * @private
   * @returns {object} The markers and areas and lines
   */
  chartTemplate() {
    return `
    <g class="marker-lines">
      ${(this as any).lineMarkers().lines}
    </g>
    <g class="areas">
      ${this.#areas()}
    </g>
    <g class="markers">
      ${(this as any).lineMarkers().markers}
    </g>`;
  }

  /**
   * Generate the svg markup for the area paths
   * @returns {string} The area markup
   * @private
   */
  #areas() {
    let areaHTML = '';

    (this as any).markerData.points.forEach((pointGroup: any, groupIndex: number) => {
      let areas = '';
      pointGroup.forEach((point: any, index: number) => {
        if (pointGroup[index + 1]) {
          areas += `M${point.left},${point.top}L${point.left},${(this as any).markerData.gridBottom}L${pointGroup[index + 1]?.left},${(this as any).markerData.gridBottom}L${pointGroup[index + 1]?.left},${pointGroup[index + 1]?.top}`;
        }
      });
      areaHTML += `<path class="color-${groupIndex + 1} animate" part="area" d="${areas}Z" fill="var(${(this as any).color(groupIndex)})"}>
      </path>`;
    });
    return areaHTML;
  }
}
