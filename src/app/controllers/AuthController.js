import User from '../models/User';
import UserType from '../models/UserType';
import RefreshToken from '../models/RefreshToken';
import bcrypt from 'bcrypt';
import generateToken from '../../services/generateToken';
import generateRefreshToken from '../../services/generateRefreshToken';
import dayjs from 'dayjs';
import { OAuth2Client } from 'google-auth-library';

class AuthController {
  async auth(req, res) {
    const { tokenGoogle } = req.body;
    const clientGoogle = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    if (tokenGoogle) {
      const checkTokenAuth = await clientGoogle
        .verifyIdToken({
          idToken: tokenGoogle,
          audience: process.env.GOOGLE_CLIENT_ID,
        })
        .catch(() => {
          return res.status(400).json({ msg: 'Token inválido' });
        });
      const payload = checkTokenAuth.getPayload();
      const domain = payload['hd'];
      const userId = payload['sub'];
      const email = payload['email'];
      const username = email.substring(0, email.indexOf('@'));
      const password = userId;
      const name = payload['name'];
      const picture = payload['picture'];
      let newUser;

      if (domain !== 'elastic.fit') {
        return res
          .status(400)
          .json({ msg: 'Erro ao logar! Entre com uma conta @elastic.fit' });
      }
      const userData = await User.findOne({
        where: { email },
      });
      if (!userData) {
        try {
          newUser = await User.create({
            email,
            google_id: userId,
            name,
            password: userId,
            username,
            id_user_type: 3,
          });
        } catch (err) {
          return res
            .status(400)
            .json({ msg: 'Erro ao logar! Tente logar novamente2.' + err });
        }
      }
      if (
        !(await bcrypt.compare(
          password,
          newUser ? newUser.password_hash : userData.password_hash
        ))
      ) {
        return res
          .status(400)
          .json({ msg: 'Erro ao logar! Verifique seu dados.' });
      }

      return res.status(200).json({
        user: {
          id: newUser ? newUser.id : userData.id,
          name: newUser ? newUser.name : userData.name,
          username: newUser ? newUser.username : userData.username,
          email: newUser ? newUser.email : userData.email,
          user_type: newUser ? newUser.id_user_type : userData.id_user_type,
          avatar: picture ? picture : null,
        },
        token: tokenGoogle,
        // accessToken: await generateToken(
        //   {
        //     username: username || newUser.username,
        //     user_type: userData.UserType.description || '',
        //   },
        //   userData.uuid || newUser.uuid
        // ),
        // refreshToken: await generateRefreshToken(userData.id || newUser.id),
        msg: 'Logado com sucesso!',
      });
    } else {
      return res
        .status(400)
        .json({ msg: 'Erro ao logar! Verifique seu dados.' });
    }
  }

  async refreshToken(req, res) {
    const { refresh_token } = req.body;
    const refreshTokenData = await RefreshToken.findOne({
      where: { refresh_token },
    });
    if (!refreshTokenData) {
      return res.status(400).json({ msg: 'Refresh Token inválido' });
    }
    if (dayjs().isAfter(dayjs.unix(refreshTokenData.expires_in))) {
      return res.status(400).json({ msg: 'Refresh Token expirado' });
    }
    const userData = await User.findOne({
      where: { id: refreshTokenData.id_user },
      attributes: ['uuid', 'username', 'name'],
      include: [{ model: UserType, attributes: ['description'] }],
    });
    if (!userData) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }
    return res.status(200).json({
      name: userData.name,
      accessToken: await generateToken(
        {
          username: userData.username,
          user_type: userData.UserType.description,
        },
        userData.uuid,
        true
      ),
      refreshToken: await generateRefreshToken(refreshTokenData.id_user),
      msg: 'Token atualizado com sucesso.',
    });
  }
}
export default new AuthController();
