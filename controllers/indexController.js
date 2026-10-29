const getHome = async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

module.exports = { getHome };
