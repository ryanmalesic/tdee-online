import { UserController } from '../../../../controllers';
import { withMethods, withSession } from '../../../../utils/middleware';

const handler = async (req, res) => {
  const { data, error } = await UserController.getUser(req);

  if (error) {
    res.status(error.code).json(error);
    return;
  }

  res.status(200).json(data);
};

export default withSession(withMethods(handler, ['GET']));
