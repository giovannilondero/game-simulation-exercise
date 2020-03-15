import { random } from '../../helpers';

export default (req, res) => {
  res.json({ quantity: random(100, 100) });
};
