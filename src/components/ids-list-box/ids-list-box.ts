import { customElement, scss } from '../../core/ids-decorators.ts';
import Base from './ids-list-box-base.ts';
import './ids-list-box-option.ts';

import styles from './ids-list-box.scss';

/**
 * IDS List Box Component
 * @type {IdsListBox}
 * @inherits IdsElement
 */
@customElement('ids-list-box')
@scss(styles)
export default class IdsListBox extends Base {
  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'listbox');
  }

  /**
   * Create the Template for the contents
   * @returns {string} The template
   */
  template(): string {
    return `<slot></slot>`;
  }
}
