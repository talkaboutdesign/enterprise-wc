import { customElement, scss } from '../../core/ids-decorators';
import { attributes } from '../../core/ids-attributes';
import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin';
import IdsElement from '../../core/ids-element';
import '../ids-checkbox/ids-checkbox';

import styles from './ids-checkbox-group.scss';

/**
 * IDS Checkbox Group Component
 * @type {IdsCheckboxGroup}
 * @inherits IdsElement
 * @mixes IdsEventsMixin
 * @part checkbox-group - the checkbox-group element
 */
@customElement('ids-checkbox-group')
@scss(styles)
export default class IdsCheckboxGroup extends IdsEventsMixin(IdsElement) {
  constructor() {
    super();
  }

  /**
   * Return the attributes we handle as getters/setters
   * @returns {Array} The attributes in an array
   */
  static get attributes() {
    return [
      ...super.attributes,
      attributes.LABEL,
    ];
  }

  /**
   * Create the Template for the contents
   * @returns {string} The Template
   */
  template(): string {
    return `
      <div class="ids-checkbox-group" part="checkbox-group">
        <ids-text font-size="16" type="span">${this.label}</ids-text>
        <slot></slot>
      </div>
    `;
  }

  /**
   * Return the label of checkbox-group
   * @returns {string} label
   */
  get label(): string { return this.getAttribute('label') || ''; }

  /**
   * Set the label of checkbox-group
   * @param {string} value label
   */
  set label(value: string) {
    if (value) {
      this.setAttribute('label', value.toString());
    } else {
      this.removeAttribute('label');
    }

    const textElem = this.container?.querySelector('ids-text');
    if (textElem) textElem.innerHTML = value;
  }
}
