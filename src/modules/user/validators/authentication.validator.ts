import { check, ValidationChain } from 'express-validator';

export const registerValidator: ValidationChain[] = [
  check('username', 'Must be a valid username').isString().notEmpty(),
  check('email', 'Must be a valid email').isEmail(),
  check('password', 'Must be a valid password').isLength({ min: 6 }),
];

export const loginValidator: ValidationChain[] = [
  check('email', 'Must be a valid email').isEmail(),
  check('password', 'Must be a valid password').isLength({ min: 6 }),
];
