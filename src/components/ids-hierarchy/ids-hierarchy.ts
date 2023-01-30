import { customElement } from '../../core/ids-decorators.ts';
import { attributes } from '../../core/ids-attributes.ts';
import Base from './ids-hierarchy-base.ts';

/**
 * IDS Hierarchy Component
 * @type {IdsHierarchy}
 * @inherits IdsElement
 * @mixes IdsEventsMixin
 */
@customElement('ids-hierarchy')
export default class IdsHierarchy extends Base {
  constructor() {
    super();
  }

  /**
   * ids-hierarchy `connectedCallback` implementation
   * @returns {void}
   */
  connectedCallback() {
    super.connectedCallback();
    this.#selectItem();
  }

  template(): string {
    return `<slot></slot>`;
  }

  /**
   * Selects the current hierarchy item
   * and deselects all other items
   * @private
   * @returns {void}
   */
  #selectItem() {
    this.onEvent('itemselect', this, (e: any) => {
      e.stopPropagation();
      const items = this.querySelectorAll('ids-hierarchy-item');
      items.forEach((item: any) => {
        item.removeAttribute(attributes.SELECTED);
        item.setAttribute('aria-selected', false);
      });
      requestAnimationFrame(() => {
        e.target.setAttribute(attributes.SELECTED, true);
        e.target.setAttribute('aria-selected', true);
      });
    });
  }
}
