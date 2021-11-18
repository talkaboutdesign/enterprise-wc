/**
 * @jest-environment jsdom
 */
import '../helpers/resize-observer-mock';

import IdsTimePicker from '../../src/components/ids-time-picker/ids-time-picker';
import { attributes } from '../../src/core';

describe('IdsTimePicker Component', () => {
  let timepicker;
  let dropdowns;
  let label;
  let input;
  let popup;
  let triggerField;
  let triggerButton;

  beforeEach(async () => {
    const element = new IdsTimePicker();
    document.body.appendChild(element);
    timepicker = document.querySelector('ids-time-picker');
    dropdowns = timepicker.elements.dropdowns;
    input = timepicker.elements.input;
    popup = timepicker.elements.popup;
    triggerField = timepicker.elements.triggerField;
    triggerButton = timepicker.elements.triggerButton;
    label = triggerField.elements.label;
  });

  afterEach(async () => {
    document.body.innerHTML = '';
  });

  it('renders with no errors', () => {
    const errors = jest.spyOn(global.console, 'error');
    expect(document.querySelectorAll('ids-time-picker').length).toEqual(1);
    expect(errors).not.toHaveBeenCalled();

    expect(dropdowns.hours).toBeDefined();
    expect(dropdowns.minutes).toBeDefined();
    expect(dropdowns.seconds).toBeDefined();
    expect(dropdowns.period).toBeDefined();
    expect(label).toBeDefined();
    expect(input).toBeDefined();
    expect(popup).toBeDefined();
    expect(triggerButton).toBeDefined();
    expect(triggerField).toBeDefined();
  });

  it('renders placeholder', () => {
    expect(timepicker.placeholder).toBe('');

    const text = 'Placeholder text here';
    timepicker.setAttribute(attributes.PLACEHOLDER, text);
    expect(timepicker.placeholder).toContain(text);
    expect(input.getAttribute(attributes.PLACEHOLDER)).toContain(text);

    const text2 = 'Another placeholder';
    timepicker.placeholder = text2;
    expect(timepicker.getAttribute(attributes.PLACEHOLDER)).toContain(text2);
    expect(input.getAttribute(attributes.PLACEHOLDER)).toContain(text2);
  });

  it('renders label', () => {
    expect(timepicker.label).toBe('');
    const text = 'Label text here';
    timepicker.setAttribute(attributes.LABEL, text);
    expect(timepicker.label).toContain(text);
    expect(label.textContent).toContain(text);

    const text2 = 'Another label';
    timepicker.label = text2;
    expect(timepicker.getAttribute(attributes.LABEL)).toContain(text2);
    expect(label.textContent).toContain(text2);
  });

  it('renders 12 hours', () => {
    timepicker.format = 'hh:mm';
    timepicker.setTimeOnField({ hours: '12', minutes: '00' });
    expect(timepicker.value).toBe('12:00');
  });

  it('renders 24 hours', () => {
    timepicker.format = 'HH:mm';

    timepicker.setTimeOnField({ hours: '23', minutes: '00' });
    expect(timepicker.value).toBe('23:00');

    timepicker.setTimeOnField({ hours: '11', minutes: '30' });
    expect(timepicker.value).toBe('11:30');
  });

  it('renders minutes', () => {
    timepicker.setAttribute(attributes.FORMAT, 'hh:mm');
    timepicker.replaceWith(timepicker);

    timepicker.setTimeOnField({ hours: '10', minutes: '33' });
    expect(timepicker.value).toBe('10:33');

    timepicker.setTimeOnField({ hours: '9', minutes: '4' });
    expect(timepicker.value).toBe('09:04');
  });

  it('renders minutes intervals', () => {
    timepicker.setAttribute(attributes.FORMAT, 'hh:mm');
    timepicker.replaceWith(timepicker);

    expect(timepicker.intervals.minutes).toBeFalsy();

    timepicker.setAttribute(attributes.MINUTE_INTERVAL, '5');
    expect(timepicker.intervals.minutes).toBe(5);
    expect(timepicker.options.minutes).toStrictEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);

    timepicker.setAttribute(attributes.MINUTE_INTERVAL, '10');
    expect(timepicker.intervals.minutes).toBe(10);
    expect(timepicker.options.minutes).toStrictEqual([0, 10, 20, 30, 40, 50]);

    timepicker.setAttribute(attributes.MINUTE_INTERVAL, '15');
    expect(timepicker.intervals.minutes).toBe(15);
    expect(timepicker.options.minutes).toStrictEqual([0, 15, 30, 45]);
  });

  it('renders seconds', () => {
    timepicker.setAttribute(attributes.FORMAT, 'hh:mm:ss');
    timepicker.replaceWith(timepicker);

    dropdowns.hours.value = '10';
    dropdowns.minutes.value = '10';

    timepicker.setTimeOnField({ seconds: '33' });
    expect(timepicker.value).toBe('10:10:33');

    timepicker.setTimeOnField({ seconds: '4' });
    expect(timepicker.value).toBe('10:10:04');

    timepicker.setTimeOnField({ seconds: '0' });
    expect(timepicker.value).toBe('10:10:00');
  });

  it('renders seconds intervals', () => {
    timepicker.setAttribute(attributes.FORMAT, 'hh:mm:ss');
    timepicker.replaceWith(timepicker);

    expect(timepicker.intervals.seconds).toBeFalsy();

    timepicker.setAttribute(attributes.SECOND_INTERVAL, '5');
    expect(timepicker.intervals.seconds).toBe(5);
    expect(timepicker.options.seconds).toStrictEqual([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);

    timepicker.setAttribute(attributes.SECOND_INTERVAL, '10');
    expect(timepicker.intervals.seconds).toBe(10);
    expect(timepicker.options.seconds).toStrictEqual([0, 10, 20, 30, 40, 50]);

    timepicker.setAttribute(attributes.SECOND_INTERVAL, '15');
    expect(timepicker.intervals.seconds).toBe(15);
    expect(timepicker.options.seconds).toStrictEqual([0, 15, 30, 45]);
  });

  it('does not render seconds', () => {
    timepicker.format = 'hh:mm';
    dropdowns.hours.value = '10';
    dropdowns.minutes.value = '10';

    timepicker.setTimeOnField({ seconds: '33' });
    expect(timepicker.value).toBe('10:10');

    timepicker.setTimeOnField({ seconds: '4' });
    expect(timepicker.value).toBe('10:10');
  });

  it('renders am/pm', () => {
    timepicker.format = 'hh:mm a';
    dropdowns.hours.value = '10';
    dropdowns.minutes.value = '00';

    timepicker.setTimeOnField({ period: 'AM' });
    expect(timepicker.value).toBe('10:00 AM');

    timepicker.setTimeOnField({ period: 'am' });
    expect(timepicker.value).toBe('10:00 AM');

    timepicker.setTimeOnField({ period: 'PM' });
    expect(timepicker.value).toBe('10:00 PM');

    timepicker.setTimeOnField({ period: 'pm' });
    expect(timepicker.value).toBe('10:00 PM');
  });

  it('does not render period (am/pm)', () => {
    timepicker.format = 'hh:mm';
    dropdowns.hours.value = '10';
    dropdowns.minutes.value = '00';

    timepicker.setTimeOnField({ period: 'AM' });
    expect(timepicker.value).toBe('10:00');

    timepicker.setTimeOnField({ period: 'PM' });
    expect(timepicker.value).toBe('10:00');
  });

  it('fires dropdown change-event for hours', () => {
    timepicker.format = 'hh:mm';
    timepicker.triggerEvent('change', dropdowns.hours, { detail: { value: '5' } });
    expect(timepicker.value).toBe('05:00');

    timepicker.triggerEvent('change', dropdowns.hours, { detail: { value: '21' } });
    expect(timepicker.value).toBe('21:00');

    timepicker.triggerEvent('change', dropdowns.hours, { detail: { value: '67' } });
    expect(timepicker.value).toBe('21:00');
  });

  it('fires dropdown change-event for minutes', () => {
    timepicker.format = 'HH:mm';
    timepicker.triggerEvent('change', dropdowns.minutes, { detail: { value: '5' } });
    expect(timepicker.value).toBe('01:05');

    timepicker.triggerEvent('change', dropdowns.minutes, { detail: { value: '21' } });
    expect(timepicker.value).toBe('01:21');

    timepicker.triggerEvent('change', dropdowns.minutes, { detail: { value: '67' } });
    expect(timepicker.value).toBe('01:21');
  });

  it('fires dropdown change-event for seconds', () => {
    timepicker.format = 'hh:mm:ss';
    timepicker.triggerEvent('change', dropdowns.seconds, { detail: { value: '5' } });
    expect(timepicker.value).toBe('01:00:05');

    timepicker.triggerEvent('change', dropdowns.seconds, { detail: { value: '21' } });
    expect(timepicker.value).toBe('01:00:21');

    timepicker.triggerEvent('change', dropdowns.seconds, { detail: { value: '67' } });
    expect(timepicker.value).toBe('01:00:00');
  });

  it('fires dropdown change-event for period (am/pm)', () => {
    timepicker.format = 'hh:mm a';
    timepicker.triggerEvent('change', dropdowns.period, { detail: { value: 'pm' } });
    expect(timepicker.value).toBe('01:00 PM');

    timepicker.triggerEvent('change', dropdowns.period, { detail: { value: 'am' } });
    expect(timepicker.value).toBe('01:00 AM');

    timepicker.triggerEvent('change', dropdowns.period, { detail: { value: 'PM' } });
    expect(timepicker.value).toBe('01:00 PM');

    timepicker.triggerEvent('change', dropdowns.period, { detail: { value: 'AM' } });
    expect(timepicker.value).toBe('01:00 AM');
  });

  it('can show and hide popup', () => {
    expect(timepicker.isOpen).toBe(false);

    timepicker.openTimePopup();
    expect(timepicker.isOpen).toBe(true);

    timepicker.closeTimePopup();
    expect(timepicker.isOpen).toBe(false);
  });

  it('can show and hide popup on clicking the trigger-button', () => {
    expect(timepicker.isOpen).toBe(false);
    timepicker.triggerEvent('mouseup', triggerButton);
    expect(timepicker.isOpen).toBe(true);

    timepicker.triggerEvent('mouseup', triggerButton);
    expect(timepicker.isOpen).toBe(false);
  });

  it('can show and hide popup on keyboard-Enter', () => {
    expect(timepicker.isOpen).toBe(false);

    timepicker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(timepicker.isOpen).toBe(true);

    timepicker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(timepicker.isOpen).toBe(false);
  });

  it('can show popup with keyboard-ArrowDown', () => {
    expect(timepicker.isOpen).toBe(false);

    timepicker.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(timepicker.isOpen).toBe(true);
  });

  it('can hide popup on keyboard-Escape', () => {
    timepicker.openTimePopup();
    expect(timepicker.isOpen).toBe(true);

    timepicker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(timepicker.isOpen).toBe(false);
  });

  it('can hide popup on keyboard-Backspace', () => {
    timepicker.openTimePopup();
    expect(timepicker.isOpen).toBe(true);

    timepicker.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    expect(timepicker.isOpen).toBe(false);
  });

  it('can be disabled', () => {
    const morning = '01:00:00 AM';
    const evening = '06:30:00 PM';

    timepicker.value = morning;
    expect(timepicker.value).toBe(morning);
    expect(timepicker.disabled).toBe(false);

    timepicker.setAttribute(attributes.DISABLED, true);
    expect(timepicker.disabled).toBe('true');

    timepicker.value = evening;
    expect(timepicker.value).toBe(morning);

    timepicker.disabled = false;
    expect(timepicker.getAttribute(attributes.DISABLED)).toBe(false);
    expect(timepicker.disabled).toBe(false);

    timepicker.value = evening;
    expect(timepicker.value).toBe(evening);
  });

  it('can be readonly', () => {
    const morning = '01:00:00 AM';
    const evening = '06:30:00 PM';

    timepicker.value = morning;
    expect(timepicker.value).toBe(morning);
    expect(timepicker.readonly).toBe(false);

    timepicker.setAttribute(attributes.READONLY, true);
    expect(timepicker.readonly).toBe('true');

    timepicker.value = evening;
    expect(timepicker.value).toBe(morning);

    timepicker.readonly = false;
    expect(timepicker.getAttribute(attributes.READONLY)).toBe(false);
    expect(timepicker.readonly).toBe(false);

    timepicker.value = evening;
    expect(timepicker.value).toBe(evening);
  });

  it('can validate/enforce required', () => {});
});
