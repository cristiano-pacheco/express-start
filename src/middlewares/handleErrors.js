module.exports = (err, req, res) => {
  res.status(err.status || 500);
  const data = { message: err.message };
  res.json(data);
};
