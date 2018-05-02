import httpStatus from 'http-status';
import moment from 'moment';

import { paginate } from '../helpers/utils';
import { APIError } from '../helpers/errors';
import config from '../config/env';
import db from '../config/firebase_admin';
import { createJwt, verifyJwt } from '../services/jwt';
import User from '../models/user';

const UserController = {
  /**
   * @swagger
   * /users:
   *   get:
   *     tags:
   *      - User
   *     description: Show all users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: limit
   *         description: pagination limit.
   *         in: query
   *         required: false
   *         type: string
   *       - name: offset
   *         description: pagination offset.
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: return an array of users'
   */

  async readAll(req, res) {
    const offset = paginate.offset(req.query.offset);
    const limit = paginate.limit(req.query.limit);

    const find = req.query.find || {};
    const sort = req.query.sort || {
      createdAt: 1,
    };

    const users = await User.paginate(find, {
      sort,
      offset,
      limit,
    });
    res.status(httpStatus.OK).json(users);
  },

  /**
   * @swagger
   * /users:
   *   post:
   *     tags:
   *      - User
   *     description: Create users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object.
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: Successfully created
   *         schema:
   *           allOf:
   *              - $ref: '#/definitions/User'
   *              - properties:
   *                  id:
   *                    type: string
   *                  createdAt:
   *                    type: string
   *                    format: date-time
   *                  updatedAt:
   *                    type: string
   *                    format: date-time
   */
  async create(req, res) {
    const newUser = await User.create(req.body);
    return res.status(httpStatus.CREATED).json(newUser);
  },

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     tags:
   *      - User
   *     description: updates an user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User id
   *         in: path
   *         required: true
   *         type: string
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/User'
   *     responses:
   *       200:
   *         description: User object'
   */

  async update(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) throw new APIError('User not found.', httpStatus.NOT_FOUND);
    user.set(req.body);
    await user.save();
    res.status(httpStatus.NO_CONTENT).end();
  },
  /**
   * @swagger
   * /users/login:
   *   post:
   *     tags:
   *      - User
   *     description: Login to the application
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: User's password.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: returns user token'
   */

  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new APIError('user not found', httpStatus.NOT_FOUND);
    if (!user.authenticate(req.body.password)) {
      throw new APIError('wrong password', httpStatus.BAD_REQUEST);
    }
    return res.json({
      token: createJwt(user),
    });
  },

  async validate(req, res, next) {
    const { expTime } = config.constants;
    const token = req.get('Authorization');
    const { user, date } = await verifyJwt(token);
    const expirationtime = moment(date).add(expTime, 'hours');
    if (expirationtime < Date.now()) {
      throw new APIError('Token expired', httpStatus.BAD_REQUEST);
    }
    if (!user) throw new APIError('User not found', httpStatus.UNAUTHORIZED);
    res.locals.user = user;
    next();
  },

  /**
   * @swagger
   * /users/me:
   *   get:
   *     tags:
   *      - User
   *     description: user info
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: User's first name.
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: user information'
   */

  readByMe(req, res) {
    return res.status(httpStatus.OK).json(res.locals.user);
  },

    /**
   * @swagger
   * /users/contacts:
   *   post:
   *     tags:
   *      - User
   *     description: Add a new contact to your contact's list
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: contact's email.
   *         in: formData
   *         type: string
   *       - name: name
   *         description: contact's name.
   *         in: formData
   *         type: string
   *       - name: address
   *         description: contact's address.
   *         in: formData
   *         type: string
   *       - name: phoneNumber
   *         description: contact's phone number.
   *         in: formData
   *         type: string
   *       - name: Authorization
   *         description: jwt.
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: returns user token'
   */

  addContact(req, res) {
    const { id } = res.locals.user;
    const userRef = db.ref("contacs").child(id);
    userRef.push(req.body, (err) => {
      if (err) {
        throw new APIError('Firebase problem', httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        return res.status(httpStatus.CREATED).end();
      }
    });
  },

};

export default UserController;
