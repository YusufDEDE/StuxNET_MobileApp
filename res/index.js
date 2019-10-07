/**
 * This syntax prevent circular import
 * prevent some break in hot reload
 * and optimize the number of file imported
 */

module.exports = {
  get strings() {
    return require('./strings').default;
  },
  get images() {
    return require('./images').default;
  },
  get colors() {
    return require('./colors').default;
  },
  get fonts() {
    return require('./fonts').default;
  },
};
