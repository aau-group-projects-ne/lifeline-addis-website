exports.login = (req, res) => {
  const { username } = req.body;
  res.send(`Welcome ${username} `);
};

exports.register = (req, res) => {};

exports.logout = (req, res) => {};
