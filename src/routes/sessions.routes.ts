import { Router } from 'express';

import AuthenticateUsersService from '../services/AuthenticateUsersService';

const sessionsRouter = Router();

interface User2 {
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  try{
    const { email, password } = request.body;

    const autenticateUser = new AuthenticateUsersService();

    const { user, token } = await autenticateUser.execute({
      email,
      password,
    });

    const user2: User2 = user;

    delete user2.password;

    return response.json({ user2, token});
  }catch (err) {
    return response.status(err.statusCode).json({ error: err.message });
  }
});

export default sessionsRouter;
