import { OAuth2Client } from 'google-auth-library';

async function isAuthenticated(req, res, next) {
  const clientGoogle = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'Token não fornecido' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ msg: 'Token inválido' });
  }

  try {
    const decoded = await clientGoogle.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = decoded.getPayload();
    req.email = payload['email'];
    req.userUUID = payload['sub'];
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
}
export default isAuthenticated;
