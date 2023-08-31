import validator from '../utils/validator.js';

/**
 * Configuration Map for Data Type Validation
 *
 * This module defines a configuration map that facilitates data type validation
 * and error handling. It provides predefined configurations for different data types
 * and custom validation patterns.
 *
 * @module typeConfigs
 */

/**
 * Validation rules and error messages for different data types.
 *
 * @typedef {object} TypeValidationConfig
 * @property {Function} validate - Validation function for the specific data type.
 * @property {string} errorMessage - Error message for the specific data type validation.
 */

/**
 * Configuration object for defining validation rules and error messages.
 * @type {Object.<string, TypeValidationConfig>}
 */
const typeConfigs = {
  string: {
    type: 'string',
    validate: function (value) {
      return validator.validateType(value, this.type);
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a string.';
    },
  },
  number: {
    type: 'number',
    validate: function (value) {
      return validator.validateType(value, this.type);
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a number.';
    },
  },
  boolean: {
    type: 'boolean',
    validate: function (value) {
      return validator.validateType(value, this.type);
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a boolean.';
    },
  },
  function: {
    type: 'function',
    validate: function (value) {
      return validator.validateType(value, this.type);
    },
    errorMessage: function () {
      return 'Invalid data type. Expected a function.';
    },
  },
  object: {
    type: 'object',
    validate: function (value) {
      return validator.validateType(value, this.type);
    },
    errorMessage: function () {
      return 'Invalid data type. Expected an object.';
    },
  },
  required: {
    validate: function (value) {
      return value !== undefined && value !== null;
    },
    errorMessage: function () {
      return 'This field is required.';
    },
  },
  numberGreaterThan: {
    comparisonValue : null,
    validate: function (value, comparisonValue) {
      this.comparisonValue = comparisonValue;
      return validator.validateType(value, 'number') && value > comparisonValue;
    },
    errorMessage: function () {
      return `Value must be greater than the ${this.comparisonValue}.`;
    },
  },
  numberLessThan: {
    comparisonValue : null,
    validate: function (value, comparisonValue) {
      this.comparisonValue = comparisonValue;
      return validator.validateType(value, 'number') && value < comparisonValue;
    },
    errorMessage: function () {
      return `Value must be less than the ${this.comparisonValue}.`;
    },
  },
  matchesExpectedValue: {
    expectedValue : null,
    validate: function (value, expectedValue) {
      this.expectedValue = expectedValue;
      return value === expectedValue;
    },
    errorMessage: function () {
      return `Value does not match the ${this.expectedValue}.`;
    },
  },
  mongodbId: {
    validate: function (value) {
      return validator.validateMongodbId(value);
    },
    errorMessage: function () {
      return 'Invalid MongoDB ID format.';
    },
  },
  array: {
    validate: function (value) {
      return validator.validateArray(value) && value.length > 0;
    },
    errorMessage: function () {
      return 'Invalid data type. Expected an array.';
    },
  },
  email: {
    validate: function (value) {
      return validator.validateEmail(value);
    },
    errorMessage: function () {
      return 'Invalid email format.';
    },
  },
  datePattern: {
    pattern: /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    validate: function (value) {
      return validator.validateAgainstPattern(value, this.pattern);
    },
    errorMessage: function () {
      return 'Invalid date format. Expected MM/DD/YYYY.';
    },
  },
  indonesianPhoneNumberPattern: {
    pattern: /^(0|\+62)\d{9,13}$/,
    validate: function (value) {
      return validator.validateAgainstPattern(value, this.pattern);
    },
    errorMessage: function () {
      return 'Invalid Indonesian phone number.';
    },
  },
  universalPhoneNumberPattern: {
    pattern: /^(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/,
    validate: function (value) {
      return validator.validateAgainstPattern(value, this.pattern);
    },
    errorMessage: function () {
      return 'Invalid universal phone number.';
    },
  },
  passwordPattern: {
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    validate: function (value) {
      return validator.validateAgainstPattern(value, this.pattern);
    },
    errorMessage: function () {
      return 'Invalid password format. Must contain at least one uppercase letter and one digit.';
    },
  },
};

export default typeConfigs;
