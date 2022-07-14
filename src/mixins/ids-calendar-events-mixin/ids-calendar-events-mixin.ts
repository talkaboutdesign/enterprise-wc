import IdsCalendarEvent, { CalendarEventData, CalendarEventTypeData } from '../../components/ids-calendar/ids-calendar-event';
import { attributes } from '../../core/ids-attributes';
import { stringToBool } from '../../utils/ids-string-utils/ids-string-utils';

const IdsCalendarEventsMixin = (superclass: any) => class extends superclass {
  #eventsData: CalendarEventData[] = [];

  #eventTypesData: CalendarEventTypeData[] = [];

  static get attributes() {
    return [
      ...super.attributes,
      attributes.VIEW_PICKER
    ];
  }

  /**
   * Set calendar events to display on week view
   * @param {CalendarEventData[]} data array of events
   */
  set eventsData(data: CalendarEventData[]) {
    data = this.sortEventsByDate(data);
    this.#eventsData = data;
    this.renderEventsData?.(true);
    this.onEventsChange?.(data);
  }

  /**
   * Gets calendar events
   * @returns {CalendarEventData[]} array of events
   */
  get eventsData(): CalendarEventData[] {
    return this.#eventsData;
  }

  /**
   * Set event types for week view
   * @param {CalendarEventTypeData[]} data array of event types
   */
  set eventTypesData(data: CalendarEventTypeData[]) {
    this.#eventTypesData = data;
    this.renderEventsData?.(true);
    this.onEventTypesChange?.(data);
  }

  /**
   * Gets event types of week view
   * @returns {CalendarEventTypeData[]} array of event types
   */
  get eventTypesData(): CalendarEventTypeData[] {
    return this.#eventTypesData;
  }

  /**
   * Allows setting async function to fetch calendar event data
   * Passes startDate and endDate as callback arguments
   * @param {Function} fn Async function
   */
  set beforeEventsRender(fn: (startDate: Date, endDate: Date) => Promise<CalendarEventData[]>) {
    this.state.beforeEventsRender = fn;
    this.renderEventsData();
  }

  /**
   * Sets whether view picker is visible in toolbar
   * @param {string|boolean} value show view picker if true
   */
  set viewPicker(value: string | boolean) {
    if (stringToBool(value)) {
      this.setAttribute(attributes.VIEW_PICKER, '');
    } else {
      this.removeAttribute(attributes.VIEW_PICKER);
    }
  }

  /**
   * Gets view picker value
   * @returns {boolean} true if view picker enabled
   */
  get viewPicker(): boolean {
    return this.hasAttribute(attributes.VIEW_PICKER);
  }

  /**
   * Sort calender events by date
   * @param {CalendarEventData[]} data calendar events
   * @returns {CalendarEventData[]} sorted calendar events
   */
  sortEventsByDate(data: CalendarEventData[]): CalendarEventData[] {
    return data.slice().sort((a, b) => {
      const aStart = new Date(a.starts);
      const bStart = new Date(b.starts);
      return aStart.getTime() - bStart.getTime();
    });
  }

  /**
   * Creates date key used in component
   * Format - [year][month][date]
   * @param {Date} date Date obj
   * @returns {number} 20200421
   */
  generateDateKey(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth().toString();
    const day = date.getDate().toString();

    return parseInt(`${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`);
  }

  /**
   * Removes IdsCalendarEvent components from view
   */
  removeAllEvents(): void {
    const events = this.container.querySelectorAll('ids-calendar-event');
    events.forEach((event: IdsCalendarEvent) => event.remove());
  }

  /**
   * Create view picker template used in month/week views
   * @param {string} view month | week \ day
   * @returns {string} view picker template
   */
  createViewPickerTemplate(view: 'month' | 'week' | 'day'): string {
    const value = view[0].toUpperCase() + view.slice(1).toLowerCase();

    return `
      <ids-toolbar-section align="end">
        <ids-menu-button menu="view-picker" value="${view}" dropdown-icon>
          <span slot="text"><ids-text translate-text="true">${value}</ids-text></span>
        </ids-menu-button>
        <ids-popup-menu id="view-picker" trigger="click">
          <ids-menu-group select="single">
            <ids-menu-item value="month" selected="${view === 'month'}">
              <ids-text translate-text="true">Month</ids-text>
            </ids-menu-item>
            <ids-menu-item value="week" selected="${view === 'week'}">
              <ids-text translate-text="true">Week</ids-text>
            </ids-menu-item>
            <ids-menu-item value="day" selected="${view === 'day'}">
              <ids-text translate-text="true">Day</ids-text>
            </ids-menu-item>
          </ids-menu-group>
        </ids-popup-menu>
      </ids-toolbarbar-section>
    `;
  }

  /**
   * Trigger viewchange event used in month/week views
   * @param {string} view moth | week | day
   * @param {Date} activeDate date
   */
  triggerViewChange(view: 'month' | 'week' | 'day', activeDate?: Date): void {
    if (!view) return;

    this.triggerEvent('viewchange', this, {
      detail: {
        view,
        elem: this,
        date: activeDate
      },
      bubbles: true,
      cancelable: true,
      composed: true
    });
  }

  /**
   * Triggers date change event used in month/week views
   * @param {Date} date date
   */
  triggerDateChange(date: Date) {
    this.triggerEvent('datechange', this, {
      detail: { date },
      bubbles: true,
      cancelable: true,
      composed: true
    });
  }
};

export default IdsCalendarEventsMixin;