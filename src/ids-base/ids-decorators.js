/* eslint no-param-reassign: ["error", { "props": false }] */
const pjson = require('../../package.json');

/**
 * Add the version to the component
 * @param {number} value A number for testing;
 * @returns {Function} The decoratored function
 */
export function version(value) {
  return (target, property, descriptor) => { //eslint-disable-line
    target.version = value || pjson.version;
  };
}

/**
 * Custom Element Decorator
 * @param  {string} name The custom element name
 * @returns {Function} The decoratored function
 */
export function customElement(name) {
  return (target) => {
    customElements.define(name, target);
  };
}