import { UserController } from '../../../controllers';
import { withMethods } from '../../../utils/middleware';
import withSession from '../../../utils/session';

const handler = async (req, res) => {
  const { user, error } = await UserController.getUser(req);

  if (error) {
    res.status(error.code).json(error);
  } else {
    res.status(200).json(user);
  }
};

export default withSession(withMethods(handler, ['GET']));
