/**
 * A module with some custom block helpers
 */

import handlebarsHelpers from "handlebars-helpers";
const handyHelpers = handlebarsHelpers();

const myHelpers = {
  bold: function (text) {
    return `<strong>${text}</strong>`;
  },
  ifEquals: function (arg1, arg2, options) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  },
};

export default { ...handyHelpers, ...myHelpers };
