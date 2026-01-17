// Wrap async routes to avoid repetitive try/catch
module.exports = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
