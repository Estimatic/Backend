const router = require("express").Router();
const Company = require("../schema/CompanySchema.js");
const { authenticate } = require("../auth/tokenHandlers");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newCompany = await Company.create({
      name
    });

    res.status(201).json(newCompany);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your company." });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false
    }).exec();

    res.status(201).json(updatedCompany);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your company." });
  }
});
// get single company by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).exec();
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that company."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this company." });
  }
});

module.exports = router;
