import jwt from 'jsonwebtoken';
import { JwtPayload } from '../middlewares/JwtPayload';

const generateJWT = (payload: JwtPayload) => new Promise((resolve, reject) => {
  jwt.sign(
    payload,
    process.env.SECRET_KEY_JWT as string,
    {
      expiresIn: process.env.EXPIRES_IN_JWT,
      // header: {"msg": "Hola Mundo"},
      algorithm: 'HS512',
    },
    (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    },
  );
});

export default generateJWT;
