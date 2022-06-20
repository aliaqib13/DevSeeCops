// This file processes and exports the variables from process.env
// No other files should use process.env
/* eslint-disable no-process-env, import/prefer-default-export */

export const BASE_URL = process.env.REACT_APP_URL || '';
