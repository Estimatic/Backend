const router = require("express").Router();
const Material = require("../schema/MaterialSchema.js");
const Category = require("../schema/CategorySchema.js");
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

    res.status(200).json(materials);
  } catch (e) {
    res.status(500).json({
      message: "There was an error retrieving this categories materials."
    });
  }
});

module.exports = router;
