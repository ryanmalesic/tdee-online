import { UserController } from '../../../../controllers';
import { withMethods } from '../../../../utils/middleware';
import withSession from '../../../../utils/session';

const handler = async (req, res) => {
  const { tdee, error } = await UserController.getUserTdee(req);

  if (error) {
    res.status(error.code).json(error);
  } else {
    res.status(200).json({ tdee });
  }
};

export default withSession(withMethods(handler, ['GET']));
