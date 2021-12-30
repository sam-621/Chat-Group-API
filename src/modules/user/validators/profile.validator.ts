import { check, ValidationChain } from 'express-validator';

export const updateProfileValidator: ValidationChain[] = [
  check('username', 'Must be a valid username').isString().notEmpty(),
  check('email', 'Must be a valid email').isEmail(),
  check('profilePic', 'must be an string').isString(),
];
