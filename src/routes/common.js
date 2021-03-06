import express from 'express';
import validate from 'express-validation';

import User from '../controllers/user';
import userValidator from '../services/param_validations/user';
import catchErrors from '../services/middlewares/error_catch';

const router = express.Router(); // eslint-disable-line new-cap

validate.options({
  allowUnknownBody: false,
});

router.route('/users')
  .get(validate(userValidator.readAll), catchErrors(User.readAll))
  .post(validate(userValidator.create), catchErrors(User.create));

router.route('/users/:id')
  .patch(validate(userValidator.update), catchErrors(User.update));

router.route('/users/login')
  .post(validate(userValidator.login), catchErrors(User.login));

router.route('/users/me')
  .get(validate(userValidator.readByMe), catchErrors(User.validate), User.readByMe);

router.route('/users/contacts')
  .post(validate(userValidator.addContact), catchErrors(User.validate), User.addContact);
export default router;
