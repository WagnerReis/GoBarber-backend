import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

interface User2 {
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try{
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const user2: User2 = user;

    delete user2.password;

    return response.json(user2);
  }catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
