/**
 * @jest-environment jsdom
 */
import IdsBarChart from '../../src/components/ids-bar-chart/ids-bar-chart';
import dataset from '../../src/assets/data/components.json';
import { deepClone } from '../../src/utils/ids-deep-clone-utils/ids-deep-clone-utils';
import '../helpers/resize-observer-mock';

describe('IdsBarChart Component', () => {
  let barChart: any;

  beforeEach(async () => {
    barChart = new IdsBarChart();
    barChart.animated = false;
    document.body.appendChild(barChart);
    barChart.data = dataset;
  });

  afterEach(async () => {
    document.body.innerHTML = '';
  });

  it('renders with no errors', () => {
    const errors = jest.spyOn(global.console, 'error');

    document.body.innerHTML = '';
    barChart = new IdsBarChart();
    barChart.animated = false;
    document.body.appendChild(barChart);
    barChart.data = dataset;

    barChart.remove();
    expect(errors).not.toHaveBeenCalled();
  });

  it('can set custom colors', () => {
    barChart.data = [{
      data: [{
        name: 'Jan',
        value: 100
      }, {
        name: 'Feb',
        value: 200
      }],
      name: 'Series 1',
      color: '#800000',
    }, {
      data: [{
        name: 'Jan',
        value: 100
      }, {
        name: 'Feb',
        value: 300
      }],
      color: 'var(--ids-color-palette-azure-20)',
      name: 'Series 2'
    }];
    barChart.rerender();

    // Note: This doesnt test this really well since jest doesnt support stylesheets - see also the percy test
    expect(barChart.container.parentNode.querySelectorAll('.swatch')[0].classList.contains('color-1')).toBeTruthy();
    expect(barChart.shadowRoot.querySelectorAll('.color-1')[0].classList.contains('color-1')).toBeTruthy();
    expect(barChart.color(0)).toEqual('var(color-1)');

    expect(barChart.container.parentNode.querySelectorAll('.swatch')[1].classList.contains('color-2')).toBeTruthy();
    expect(barChart.shadowRoot.querySelectorAll('.color-2')[0].classList.contains('color-2')).toBeTruthy();
    expect(barChart.color(1)).toEqual('var(color-2)');
  });

  it('can set accessible patterns', () => {
    document.body.innerHTML = '';
    barChart = new IdsBarChart();
    barChart.animated = false;
    document.body.appendChild(barChart);

    // Mock stylesheets
    barChart.shadowRoot.styleSheets = [{
      insertRule: jest.fn()
    }];

    barChart.data = [{
      data: [{
        name: 'Jan',
        value: 100
      }, {
        name: 'Feb',
        value: 200
      }],
      name: 'Series 1',
      pattern: 'circles',
      patternColor: '#DA1217'
    }, {
      data: [{
        name: 'Jan',
        value: 100
      }, {
        name: 'Feb',
        value: 300
      }],
      name: 'Series 2',
      pattern: 'exes'
    }];

    expect(barChart.container.parentNode.querySelectorAll('.swatch svg')[0].querySelector('rect').getAttribute('fill')).toEqual('url(#circles)');
    expect(barChart.shadowRoot.querySelectorAll('.color-1')[0].getAttribute('fill')).toEqual('url(#circles)');
    expect(barChart.color(0)).toEqual('#DA1217');

    expect(barChart.container.parentNode.querySelectorAll('.swatch svg')[1].querySelector('rect').getAttribute('fill')).toEqual('url(#exes)');
    expect(barChart.shadowRoot.querySelectorAll('.color-2')[0].getAttribute('fill')).toEqual('url(#exes)');
    expect(barChart.color(1)).toEqual('var(--ids-color-palette-turquoise-40)');
  });

  it('can set barPercentage', () => {
    expect(barChart.barPercentage).toEqual(0.5);
    barChart.barPercentage = 1.5;
    barChart.rerender();
    expect(barChart.getAttribute('bar-percentage')).toEqual('1.5');
  });

  it('renders animated elements', () => {
    document.body.innerHTML = '';
    document.body.insertAdjacentHTML('beforeend', `<ids-bar-chart animated="true"></ids-bar-chart>`);
    barChart = document.querySelector('ids-bar-chart');
    barChart.width = 500;
    barChart.height = 500;
    barChart.data = dataset;
    barChart.rerender();
    expect(barChart.container.querySelectorAll('animate')).toHaveLength(36);
    barChart.animated = false;
    barChart.remove();
  });

  it('can set category percentage', () => {
    expect(barChart.categoryPercentage).toEqual(0.9);
    barChart.categoryPercentage = 1.5;
    barChart.rerender();
    expect(barChart.getAttribute('category-percentage')).toEqual('1.5');
  });

  it('supports stacked chart', () => {
    document.body.innerHTML = '';
    barChart = new IdsBarChart();
    barChart.animated = false;
    document.body.appendChild(barChart);
    barChart.width = 500;
    barChart.height = 500;
    barChart.stacked = true;
    barChart.data = dataset;

    expect(barChart.container.querySelectorAll('[index="0"]').length).toBe(3);
    expect(barChart.container.querySelectorAll('[index="1"]').length).toBe(3);
    expect(barChart.container.querySelectorAll('[index="2"]').length).toBe(3);
  });

  it('shows a tooltip on hover', (done) => {
    barChart.animated = false;
    const rect = barChart.container.querySelector('rect');
    rect.dispatchEvent(new CustomEvent('hoverend'));
    const tooltip: any = barChart.container.querySelector('ids-tooltip');
    setTimeout(() => {
      expect(tooltip.visible).toEqual(true);
      expect(tooltip.textContent).toEqual('Jan 100');
      done();
    }, 1);
  });

  it('wont error if no vertical lines', () => {
    const errors = jest.spyOn(global.console, 'error');
    barChart.shadowRoot.querySelector('.vertical-lines').remove();
    barChart.rendered();
    expect(errors).not.toHaveBeenCalled();
  });

  it('shows a custom tooltip on hover', (done) => {
    document.body.innerHTML = '';
    barChart = new IdsBarChart();
    barChart.animated = false;
    document.body.appendChild(barChart);

    barChart.data = [{
      data: [{
        name: 'Jan',
        value: 100,
        tooltip: 'Test Tooltip'
      }, {
        name: 'Feb',
        value: 200,
        tooltip: 'Test Tooltip'
      }],
      name: 'Series 1'
    }, {
      data: [{
        name: 'Jan',
        value: 100,
        tooltip: '{{value}}'
      }, {
        name: 'Feb',
        value: 300,
        tooltip: '{{value}}'
      }],
      name: 'Series 2'
    }];

    const rect = barChart.container.querySelector('rect');
    rect.dispatchEvent(new CustomEvent('hoverend'));
    const tooltip: any = barChart.container.querySelector('ids-tooltip');
    setTimeout(() => {
      expect(tooltip.visible).toEqual(true);
      expect(tooltip.textContent).toEqual('Test Tooltip');
      done();
    }, 1);
  });

  it('shows a stacked tooltip on hover', (done) => {
    document.body.innerHTML = '';
    barChart = new IdsBarChart();
    barChart.stacked = true;
    barChart.animated = false;
    document.body.appendChild(barChart);

    barChart.data = [{
      data: [{
        name: 'Jan',
        value: 100
      }, {
        name: 'Feb',
        value: 200
      }],
      name: 'Series 1'
    }, {
      data: [{
        name: 'Jan',
        value: 100
      }, {
        name: 'Feb',
        value: 300
      }],
      name: 'Series 2'
    }];

    const rect = barChart.container.querySelector('rect');
    rect.dispatchEvent(new CustomEvent('hoverend'));
    const tooltip: any = barChart.container.querySelector('ids-tooltip');
    setTimeout(() => {
      expect(tooltip.visible).toEqual(true);
      expect(tooltip.textContent).toContain('Jan');
      expect(tooltip.textContent).toContain('Series 1');
      expect(tooltip.textContent).toContain('Series 2');
      done();
    }, 1);
  });

  it('should set selectable', () => {
    expect(barChart.selectable).toEqual(undefined);
    expect(barChart.getAttribute('selectable')).toEqual(null);
    barChart.selectable = true;
    expect(barChart.selectable).toEqual(true);
    expect(barChart.getAttribute('selectable')).toEqual('');
    barChart.selectable = false;
    expect(barChart.selectable).toEqual(false);
    expect(barChart.getAttribute('selectable')).toEqual(null);
  });

  it('should select/deselect by click', () => {
    expect(barChart.selectionElements.length).toEqual(0);
    expect(barChart.setSelection()).toEqual(false);
    const triggerClick = (el: any) => el.dispatchEvent(new Event('click', { bubbles: true }));
    barChart.selectable = true;
    let selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);

    let elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);
    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);

    elem = barChart.shadowRoot.querySelector('.bar[group-index="1"][index="2"]');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(3);
    elem = barChart.shadowRoot.querySelector('.bar[group-index="1"][index="2"]');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);
  });

  it('should switch select to other elements', () => {
    const triggerClick = (el: any) => el.dispatchEvent(new Event('click', { bubbles: true }));
    barChart.selectable = true;
    let selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);

    let elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);

    elem = barChart.shadowRoot.querySelector('.bar[group-index="1"][index="2"]');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(3);

    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(2)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);

    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);

    elem = barChart.shadowRoot.querySelector('.bar[group-index="0"][index="2"]');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(3);

    elem = barChart.shadowRoot.querySelector('.bar[group-index="1"][index="3"]');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(3);
  });

  it('should set pre selected group elements', () => {
    document.body.innerHTML = '';
    const ds = deepClone(dataset);
    (ds as any)[0].selected = true;

    barChart = new IdsBarChart();
    barChart.selectable = true;
    barChart.animated = false;
    document.body.appendChild(barChart);
    barChart.data = ds;

    const selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);
  });

  it('should set pre selected item elements', () => {
    document.body.innerHTML = '';
    const ds = deepClone(dataset);
    (ds as any)[1].data[1].selected = true;

    barChart = new IdsBarChart();
    barChart.selectable = true;
    barChart.animated = false;
    document.body.appendChild(barChart);
    barChart.data = ds;

    const selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(3);
  });

  it('should veto before selected', async () => {
    let veto: boolean;
    barChart.addEventListener('beforeselected', (e: CustomEvent) => {
      e.detail.response(veto);
    });
    veto = false;
    const triggerClick = (el: any) => el.dispatchEvent(new Event('click', { bubbles: true }));
    barChart.selectable = true;

    let selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);

    let elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);
    veto = true;
    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);
  });

  it('should veto before deselected', async () => {
    let veto: boolean;
    barChart.addEventListener('beforedeselected', (e: CustomEvent) => {
      e.detail.response(veto);
    });

    const triggerClick = (el: any) => el.dispatchEvent(new Event('click', { bubbles: true }));
    barChart.selectable = true;

    let selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);

    let elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);
    veto = false;
    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);
    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(2)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);
    veto = true;
    elem = barChart.shadowRoot.querySelector('.chart-legend-item:nth-child(1)');
    triggerClick(elem);
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);
  });

  it('should get/set selected by api', async () => {
    barChart.setSelected();
    let selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);
    expect(barChart.getSelected()).toEqual({});
    barChart.selectable = true;

    barChart.setSelected('test');
    expect(barChart.getSelected()).toEqual({});
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(0);

    barChart.setSelected({ groupIndex: 0 });
    expect(barChart.getSelected().groupIndex).toEqual('0');
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(6);

    barChart.setSelected({ groupIndex: 1, index: 2 });
    expect(barChart.getSelected().indexes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ group: '0', index: '2' }),
        expect.objectContaining({ group: '1', index: '2' }),
        expect.objectContaining({ group: '2', index: '2' })
      ])
    );
    selected = barChart.selectionElements.filter((el: SVGElement) => el.hasAttribute('selected'));
    expect(selected.length).toEqual(3);
  });
});