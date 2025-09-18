// src/utils.js

/**
 * Check if an email is valid.
 * @param {string} email
 * @returns {boolean} true if valid
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Check if a password is strong:
 * - At least 8 characters
 * - At least one letter
 * - At least one number
 * @param {string} password
 * @returns {boolean} true if strong
 */
export const isStrongPassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/.test(password);
};

/**
 * Check if a field is empty.
 * @param {string} value
 * @returns {boolean} true if empty
 */
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};
