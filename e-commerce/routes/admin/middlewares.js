const { validationResult } = require('express-validator');

module.exports = {
  handleErrors(templateFn, dataFunc) {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let data;
        if (dataFunc) {
          data = await dataFunc(req);
        }
        return res.send(templateFn({ req, errors, ...data }));
      }

      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/signin');
    }

    next();
  },
};
