import { customElement, scss } from '../../core/ids-decorators';
import { attributes } from '../../core/ids-attributes';
import { stringToBool } from '../../utils/ids-string-utils/ids-string-utils';

import IdsEventsMixin from '../../mixins/ids-events-mixin/ids-events-mixin';
import IdsElement from '../../core/ids-element';

import getElTranslatePoint from './get-el-translate-point';
import styles from './ids-draggable.scss';

const CURSOR_EL_SIZE = 32;

/**
 * IDS Draggable Component
 * @type {IdsDraggable}
 * @inherits IdsElement
 * @mixes IdsEventsMixin
 */
@customElement('ids-draggable')
@scss(styles)
export default class IdsDraggable extends IdsEventsMixin(IdsElement) {
  #relativeBounds: any = {};

  constructor() {
    super();
  }

  /**
   * Return the properties we handle as getters/setters
   * @returns {Array} The properties in an array
   */
  static get attributes() {
    return [
      ...super.attributes,
      attributes.AXIS,
      attributes.DISABLED,
      attributes.HANDLE,
      attributes.IS_DRAGGING,
      attributes.MAX_TRANSFORM_X,
      attributes.MAX_TRANSFORM_Y,
      attributes.MIN_TRANSFORM_X,
      attributes.MIN_TRANSFORM_Y,
      attributes.PARENT_CONTAINMENT
    ];
  }

  /**
   * @returns {string} The template innerHTML to render
   */
  template(): string {
    return (
      `<slot></slot>`
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.#updateHandleElem();

    // style the cursor element
    this.#cursorEl.style.position = 'absolute';
    this.#cursorEl.style.opacity = 0;
    this.#cursorEl.style.width = `${CURSOR_EL_SIZE}px`;
    this.#cursorEl.style.height = `${CURSOR_EL_SIZE}px`;
    this.#cursorEl.style.cursor = this.#getCursorStyle();
    this.setAttribute('aria-valuenow', '0');
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /**
   * @param {"x"|"y"|undefined} value The axis that the draggable content will
   * be moving along (e.g. X => horizontal, Y => vertical);
   * By default, not defined and supports both axes.
   */
  set axis(value: string | undefined | null) {
    let nextValue;

    switch (value) {
      case 'y': {
        nextValue = 'y';
        break;
      }
      case 'x': {
        nextValue = 'x';
        break;
      }
      default: {
        nextValue = undefined;
        break;
      }
    }

    if (nextValue) {
      this.setAttribute(attributes.AXIS, nextValue);
      this.isDragging = false;
      this.#cursorEl.style.cursor = this.#getCursorStyle();
    } else if (!nextValue && this.hasAttribute(attributes.AXIS)) {
      this.removeAttribute(attributes.AXIS);
      this.isDragging = false;
      this.#cursorEl.style.cursor = this.#getCursorStyle();
    }
  }

  /**
   * @returns {"x"|"y"|null} value The axis that the draggable content will
   * be moving along (e.g. X => horizontal, Y => vertical);
   * By default not defined and supports both axes.
   */
  get axis(): string | null {
    return this.getAttribute('axis');
  }

  /**
   * @param {string | boolean} value Whether the draggable should be limited in range
   * by its parent element
   */
  set parentContainment(value: string | boolean) {
    const isTruthy = stringToBool(value);

    if (isTruthy) {
      if (this.getAttribute(attributes.PARENT_CONTAINMENT) !== '') {
        this.setAttribute(attributes.PARENT_CONTAINMENT, '');
      }
    } else if (!isTruthy && this.hasAttribute(attributes.PARENT_CONTAINMENT)) {
      this.removeAttribute(attributes.PARENT_CONTAINMENT);
    }
  }

  /**
   * @returns {boolean} value Whether the draggable should be limited in range
   * by its parent element
   */
  get parentContainment(): boolean {
    return stringToBool(this.getAttribute(attributes.PARENT_CONTAINMENT));
  }

  /**
   * @param {string | boolean} value Whether or not draggable functionality is to be disabled
   */
  set disabled(value: string | boolean) {
    const isTruthy = stringToBool(value);

    if (isTruthy && this.getAttribute(attributes.DISABLED) !== '') {
      this.offEvent('mousemove', window.document, this.onMouseMove);
      this.setAttribute(attributes.DISABLED, '');
    } else if (!isTruthy && this.hasAttribute(attributes.DISABLED)) {
      this.removeAttribute(attributes.DISABLED);
    }
  }

  /**
   * @returns {boolean} value Whether or not draggable functionality is disabled
   */
  get disabled(): boolean {
    return stringToBool(this.getAttribute(attributes.DISABLED));
  }

  /**
   * @param {string} value A query selector representing an optional handle that can be used to
   * drag the content of the draggable
   */
  set handle(value: string | null) {
    if (this.getAttribute(attributes.HANDLE) !== value) {
      if (this.hasAttribute(attributes.HANDLE) && (!value)) {
        this.removeAttribute(attributes.HANDLE);
      } else if (value) {
        this.setAttribute(attributes.HANDLE, value);
      }

      this.#updateHandleElem();
    }
  }

  /**
   * @returns {string} value A query selector representing an optional handle that can be used to
   * drag the content of the draggable
   */
  get handle(): string | null {
    return this.getAttribute(attributes.HANDLE);
  }

  #updateHandleElem = () => {
    this.offEvent('mousedown', this.#handleElem);
    this.offEvent('mouseup', window.document, this.onMouseUp);
    this.offEvent('mousemove', window.document, this.onMouseMove);

    this.#handleElem = this.handle ? (
      document.querySelector(this.handle) || this
    ) : this;

    if (this.#handleElem !== this) {
      this.#handleElem.style.cursor = this.#getCursorStyle();
    }

    this.onEvent('mousedown', this.#handleElem, (e: any) => {
      if (this.disabled || e.button !== 0) {
        return;
      }

      e.preventDefault();
      this.isDragging = true;

      this.onEvent('mouseup', document, this.onMouseUp);
      this.onEvent('mousemove', document, this.onMouseMove);

      // if we have our content being draggable by the parent element,
      // then we need to grab the first parent rectangle bounds
      // as well as append it to the associated event detail

      if (this.parentContainment) {
        this.#updateParentRect(e?.path || e?.composedPath?.());
      }

      this.#dragStartMousePoint = { x: e.x, y: e.y };

      const dragOffset = getElTranslatePoint(this);

      this.#dragStartOffset = {
        x: this.axis !== 'y' ? dragOffset.x : 0,
        y: this.axis !== 'x' ? dragOffset.y : 0
      };

      this.triggerEvent('ids-dragstart', this, {
        detail: {
          mouseX: e.x,
          mouseY: e.y,
          translateX: this.#dragStartOffset.x,
          transitionY: this.#dragStartOffset.y
        }
      });

      const thisRect = this.getBoundingClientRect();

      // track the base element rectangle
      // (before translation considered)

      this.#dragStartRect = {
        width: thisRect.width,
        height: thisRect.height,
        left: thisRect.left - this.#dragStartOffset.x,
        right: thisRect.right - this.#dragStartOffset.x,
        top: thisRect.top - this.#dragStartOffset.y,
        bottom: thisRect.bottom - this.#dragStartOffset.y
      };

      let parentLOffset = 0;
      let parentROffset = 0;
      let parentTOffset = 0;
      let parentBOffset = 0;

      if (this.#parentRect) {
        parentLOffset = (this.#parentRect.left - this.#dragStartRect.left);
        parentROffset = (this.#parentRect.right - this.#dragStartRect.right);
        parentTOffset = (this.#parentRect.top - this.#dragStartRect.top);
        parentBOffset = (this.#parentRect.bottom - this.#dragStartRect.bottom);
      }

      this.#xformBounds = {
        left: parentLOffset + (this.#relativeBounds.left || 0),
        right: parentROffset - (this.#relativeBounds.right || 0),
        top: parentTOffset + (this.#relativeBounds.top || 0),
        bottom: parentBOffset - (this.#relativeBounds.bottom || 0)
      };

      this.#cursorEl.style.pointerEvents = 'all';

      // append the cursor to either the top-level ids-container
      // or if not found the document body
      // (to avoid double overflow scrollbars)

      (document.body.querySelector('ids-container') || document.body)
        .appendChild(this.#cursorEl);
    });
  };

  /**
   * sets an optional integer attribute for an element
   * (may offload as general util; just need to think
   * through this a bit more)
   * @param {HTMLElement} elem ids element to update
   * @param {string} attribute the attribute to update
   * @param {any} value a value to set on the
   */
  #setIntAttribute(elem: any, attribute: string, value: any) {
    const nextValue = parseInt(value);

    if (nextValue !== null && !Number.isNaN(nextValue)) {
      if (parseInt(elem.getAttribute(attribute)) !== nextValue) {
        elem.setAttribute(attribute, nextValue);
      }
    } else if (value === null && elem.hasAttribute(attribute)) {
      elem.removeAttribute(attribute);
    }
  }

  set minTransformX(value: number) {
    this.#setIntAttribute(this, attributes.MIN_TRANSFORM_X, value);
  }

  get minTransformX(): number {
    return parseInt(this.getAttribute(attributes.MIN_TRANSFORM_X) ?? '0');
  }

  set maxTransformX(value: number) {
    this.#setIntAttribute(this, attributes.MAX_TRANSFORM_X, value);
  }

  get maxTransformX(): number {
    return parseInt(this.getAttribute(attributes.MAX_TRANSFORM_X) ?? '0');
  }

  set minTransformY(value: number) {
    this.#setIntAttribute(this, attributes.MIN_TRANSFORM_Y, value);
  }

  get minTransformY(): number {
    return parseInt(this.getAttribute(attributes.MIN_TRANSFORM_Y) ?? '0');
  }

  get maxTransformY(): number {
    return parseInt(this.getAttribute(attributes.MAX_TRANSFORM_Y) ?? '0');
  }

  set maxTransformY(value: number) {
    this.#setIntAttribute(this, attributes.MAX_TRANSFORM_Y, value);
  }

  /**
   * update the transform with respect to containment
   * and min/max transform bounds
   * @param {number} mouseDeltaX mouse delta x
   * @param {number} mouseDeltaY mouse delta y
   * @returns {Array} [transformX, transformY]
   */
  #updateTransform = (mouseDeltaX: number, mouseDeltaY: number) => {
    let translateX = 0;
    let translateY = 0;

    // in case we're dragging and passed in the delta
    // then consider the translateX/Y vs where we
    // first started dragging the mouse from where
    // we moved to

    if (this.axis !== 'y') {
      translateX = this.#dragStartOffset.x + mouseDeltaX;
    }

    if (this.axis !== 'x') {
      translateY = this.#dragStartOffset.y + mouseDeltaY;
    }

    if (this.parentContainment) {
      if (this.axis !== 'y') {
        translateX = Math.max(this.#xformBounds.left, translateX);
        translateX = Math.min(this.#xformBounds.right, translateX);
      }

      if (this.axis !== 'x') {
        translateY = Math.max(this.#xformBounds.top, translateY);
        translateY = Math.min(this.#xformBounds.bottom, translateY);
      }
    }

    if (this.hasAttribute(attributes.MIN_TRANSFORM_X)) {
      translateX = Math.max(translateX, this.minTransformX);
    }

    if (this.hasAttribute(attributes.MAX_TRANSFORM_X)) {
      translateX = Math.min(translateX, this.maxTransformX);
    }

    if (this.hasAttribute(attributes.MIN_TRANSFORM_Y)) {
      translateY = Math.max(translateY, this.minTransformY);
    }

    if (this.hasAttribute(attributes.MAX_TRANSFORM_Y)) {
      translateY = Math.min(translateY, this.maxTransformY);
    }

    this.style.setProperty(
      'transform',
      `translate(${translateX}px, ${translateY}px)`
    );

    this.setAttribute('aria-valuenow', (this.axis === 'x' ? translateX : translateY).toString());
    return [translateX, translateY];
  };

  /**
   * called on mouse move; transforms element for
   * transition offset and updates cursor overlay
   * element as necessary
   * @param {*} e mousemove event
   */
  onMouseMove: any = (e: any) => {
    e.preventDefault();
    const eventDetail: any = {};

    if (this.isDragging) {
      const dragDeltaX = e.x - this.#dragStartMousePoint.x;
      const dragDeltaY = e.y - this.#dragStartMousePoint.y;

      // once draggable bound to parent was updated,
      // update the transform

      const [
        translateX,
        translateY
      ] = this.#updateTransform(dragDeltaX, dragDeltaY);

      if (this.#parentRect) {
        eventDetail.parentRect = this.#parentRect;
      }

      eventDetail.mouseX = e.x;
      eventDetail.mouseY = e.y;
      eventDetail.dragDeltaX = dragDeltaX;
      eventDetail.dragDeltaY = dragDeltaY;
      eventDetail.translateX = translateX;
      eventDetail.translateY = translateY;

      if (this.#cursorEl) {
        this.#cursorEl.style.left = `${e.x - CURSOR_EL_SIZE / 2}px`;
        this.#cursorEl.style.top = `${e.y - CURSOR_EL_SIZE / 2}px`;
      }
    }

    eventDetail.originalEvent = e;

    this.triggerEvent('ids-drag', this, { detail: eventDetail });
  };

  onMouseUp: any = (e: any) => {
    if (this.isDragging) {
      this.isDragging = false;
      const translatePoint = getElTranslatePoint(this);
      this.triggerEvent('ids-dragend', this, {
        detail: {
          mouseX: e.x,
          mouseY: e.y,
          dragDeltaX: e.x - this.#dragStartMousePoint.x,
          dragDeltaY: e.y - this.#dragStartMousePoint.y,
          translateX: translatePoint.x,
          translateY: translatePoint.y
        }
      });

      (document.body.querySelector('ids-container') || document.body)
        ?.removeChild(this.#cursorEl);
    }

    this.offEvent('mousemove', document, this.onMouseMove);
    this.offEvent('mouseup', document, this.onMouseUp);

    this.#cursorEl.style.pointerEvents = 'none';
  };

  /**
   * @param {string | boolean} value Whether or not this element
   * and content is being dragged
   */
  set isDragging(value: string | boolean) {
    const isTruthy = stringToBool(value);

    if (isTruthy && this.getAttribute(attributes.IS_DRAGGING) !== '') {
      this.setAttribute(attributes.IS_DRAGGING, '');
    } else if (!isTruthy && this.hasAttribute(attributes.IS_DRAGGING)) {
      this.removeAttribute(attributes.IS_DRAGGING);
    }
  }

  /**
   * @returns {boolean} value Whether or not this element
   * and content is being dragged
   */
  get isDragging(): boolean {
    return stringToBool(this.getAttribute(attributes.IS_DRAGGING));
  }

  /**
   * Get the "cursor" property of cursor element
   * placed in front of drag
   * @returns {string} cursor property
   */
  #getCursorStyle(): string {
    switch (this.axis) {
      case 'x': { return 'ew-resize'; }
      case 'y': { return 'ns-resize'; }
      default: { return 'move'; }
    }
  }

  /**
   * Element that is currently draggable;
   * if "handle" becomes it possibly becomes the selected element.
   *
   * Otherwise it defaults to the overall draggable container (this)
   */
  #handleElem: any;

  /**
   * First measurable parent's rectangle
   * when a drag is initiated
   * @type {{ x: number, y: number }}
   */
  #parentRect: any;

  /**
   * The point where we start dragging on the mouse
   * to delta from for current tracking.
   * @type {{ x: number, y: number }}
   */
  #dragStartMousePoint: any;

  /**
   * The transform translation point applied at
   * the time of a dragstart in order to calculate
   * delta during drag
   * @type {{ x: number, y: number }}
   */
  #dragStartOffset: any;

  /**
   * The bounding rectangle of this component at the
   * time of a dragstart offset by translate (so
   * its original position in the div on start of drag)
   * @type {{ x: number, y: number }}
   */
  #dragStartRect: any;

  /**
   * Rectangle bounds that transform is limited to if drag
   * is bounded by parent
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  #xformBounds: any;

  /**
   * Element which provides cursor for mouse when
   * dragging after mousedown event since we can
   * bind to X/Y axes and there's no way to override
   * the behavior
   */
  #cursorEl: any = document.createElement('div');

  /**
   * Update parent rectangle stored in this.#parentRect
   * @param {*} path path passed by mouse/drag event
   * to traverse through shadow and lightDOM
   * @private
   */
  #updateParentRect(path: any) {
    // in order to measure the size of the parent,
    // when dragging has started, iterate through
    // path captured from drag until parent level
    // outside of this draggable or an immediate IdsElement
    // (e.g. non styled container) is detected
    this.#parentRect = undefined;

    let pathElemIndex = 0;
    let pathElem = path[pathElemIndex];
    let hasTraversedThis = false;
    let isAtSlotEl = false;
    let isAtShadowRoot = false;

    while (
      (!this.#parentRect || !hasTraversedThis || isAtShadowRoot || isAtSlotEl)
      && ((pathElemIndex + 1) < path.length)
    ) {
      if (pathElem === this) {
        hasTraversedThis = true;
      }

      pathElemIndex++;
      pathElem = path[pathElemIndex];

      isAtSlotEl = pathElem.tagName === 'SLOT';
      isAtShadowRoot = pathElem instanceof ShadowRoot;

      if (isAtShadowRoot || isAtSlotEl) {
        continue;
      }

      const rect = pathElem?.getBoundingClientRect?.();

      // only use as parent if not a non-presentational rectangles (e.g.
      // the parent IdsElement which has no explicit styling; hence
      // zero-width or zero-height rendered)

      if (rect?.height !== 0 && rect?.width !== 0) {
        this.#parentRect = rect;
      }
    }
  }

  /**
   * @param {string | number} value The max coordinates relative
   * to the overall div; e.g. "left: -20; right: -20" would extend
   * the minimum x and maximum x from current container
   * bounds, or "top: 10; bottom: 20" would make the top (upwards
   * bounds) 10 below the top or 20 below the bottom).
   */
  set relativeBounds(value: string | number | null) {
    if (value) {
      this.setAttribute(attributes.RELATIVE_BOUNDS, String(value));
      this.#updateRelativeBounds();
      return;
    }
    this.removeAttribute(attributes.RELATIVE_BOUNDS);
  }

  get relativeBounds(): string | null {
    return this.getAttribute(attributes.RELATIVE_BOUNDS);
  }

  /**
   * @param {{
   *  left: number,
   *  top: number,
   *  right: number,
   *  bottom: number
   * }} bounds rectangle bounds to hash
   * @returns {string} a hash for bounds in a predictable
   * order that can be diffed for attribute changes
   */
  getBoundsHash(bounds: any) {
    return (
      `${bounds?.left || 0
      }_${
        bounds?.right || 0
      }_${
        bounds?.top || 0
      }_${bounds?.bottom || 0}`
    );
  }

  #updateRelativeBounds() {
    const relativeBoundsAttr = this.getAttribute(attributes.RELATIVE_BOUNDS);
    const newBounds = Object.fromEntries(relativeBoundsAttr?.split(';').map((str: string) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [kStr, vStr] = str?.split?.(':');
      return [kStr, !Number.isNaN(parseInt(vStr)) ? parseInt(vStr) : 0];
    }) ?? []);

    if (this.getBoundsHash(newBounds) !== this.getBoundsHash(this.#relativeBounds)) {
      this.#relativeBounds = newBounds;
    }
  }
}
