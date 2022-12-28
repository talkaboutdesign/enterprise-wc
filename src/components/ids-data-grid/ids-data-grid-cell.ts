import { customElement } from '../../core/ids-decorators';
import IdsElement from '../../core/ids-element';
import type IdsDataGrid from './ids-data-grid';
import type { IdsDataGridColumn } from './ids-data-grid-column';

@customElement('ids-data-grid-cell')
export default class IdsDataGridCell extends IdsElement {
  rootNode?: any;

  constructor() {
    super({ noShadowRoot: true });
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  /**
   * Reference to the data grid parent
   * @returns {IdsDataGrid} the data grid parent
   */
  get dataGrid() {
    if (!this.rootNode) this.rootNode = (this.getRootNode() as any);
    return (this.rootNode.host) as IdsDataGrid;
  }

  /**
   * Rerender a cell - may be used later
   */
  renderCell() {
    const column = this.dataGrid?.columns[Number(this.getAttribute('aria-colindex')) - 1];
    let index = Number(this.parentElement?.getAttribute('data-index'));

    if (column?.formatter?.name === 'rowNumber') {
      index += 1;
    }
    const row: Record<string, any> | undefined = this.dataGrid?.data[index];
    this.innerHTML = IdsDataGridCell.template(row, column, index, this.dataGrid);
  }

  /**
   * Set the active cell for focus
   * @param {boolean} nofocus If true, do not focus the cell
   * @returns {object} the current active cell
   */
  activate(nofocus: boolean) {
    this.dataGrid.activeCell?.node?.removeAttribute('tabindex');
    this.dataGrid.activeCell.node = this;
    this.setAttribute('tabindex', '0');

    if (!nofocus) {
      this.focus();
    }
    this.dataGrid.triggerEvent('activecellchanged', this.dataGrid, { detail: { elem: this, activeCell: this.dataGrid.activeCell } });
    return this.dataGrid.activeCell;
  }

  // NOTE: check memory footprint of this caching strategy
  static cellCache: { [key: string]: string } = {};

  /**
   * Return the Template for the cell contents
   * @param {object} row The data item for the row
   * @param {object} column The column data for the row
   * @param {object} index The running index
   * @param {IdsDataGrid} dataGrid The dataGrid instance
   * @returns {string} The template to display
   */
  static template(row: Record<string, unknown>, column: IdsDataGridColumn, index: number, dataGrid: IdsDataGrid): string {
    const cacheKey = `${column.id}:${index}`;

    // NOTE: This is how we could disable cache until a proper cache-busting strategy is in place
    // delete IdsDataGridCell.cellCache[cacheKey];

    // NOTE: this type of param-based caching is good for upscroll when revising rows that have been seen already.
    // NOTE: we also need a content-cache that caches based on the actual data that's being rendered
    // NOTE: content-cache should probably be done in the IdsDataGridFormatters class
    if (!IdsDataGridCell.cellCache[cacheKey]) {
      const dataGridFormatters = (dataGrid.formatters as any);
      if (!dataGridFormatters[column?.formatter?.name || 'text'] && column?.formatter) {
        IdsDataGridCell.cellCache[cacheKey] = column?.formatter(row, column, index, dataGrid);
      } else {
        IdsDataGridCell.cellCache[cacheKey] = dataGridFormatters[column?.formatter?.name || 'text'](row, column, index, dataGrid);
      }
    }

    return IdsDataGridCell.cellCache[cacheKey];
  }
}
