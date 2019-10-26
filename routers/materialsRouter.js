const router = require("express").Router();
const Material = require("../schema/MaterialSchema.js");
const { authenticate } = require("../auth/tokenHandlers");

router.post("/", authenticate, async (req, res) => {
  try {
    const newMaterial = await Material.create(req.body);

    res.status(201).json(newMaterial);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your material." });
  }
});

// get all materials in a category
router.get("/category/:id", async (req, res) => {
  try {
    const materials = await Material.find({
      category_id: req.params.id
    }).exec();

    if (materials) {
      res.status(200).json(Materials);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find those materials."
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "There was an error retrieving this categories materials."
    });
  }
});

module.exports = router;
