export default (req, res) => {
  res.json({ quantity: Math.floor(Math.random() * 50) + 1 });
};
