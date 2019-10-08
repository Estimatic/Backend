const router = require("express").Router();
const Category = require("../schema/CategorySchema.js");
const { authenticate } = require("../auth/tokenHandlers");

router.post("/", authenticate, async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json(newCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your category." });
  }
});

// get all categories in a company
router.get("/company/:id", async (req, res) => {
  try {
    const Categorys = await Category.find({ company_id: req.params.id }).exec();

    if (Categorys) {
      res.status(200).json(Categorys);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find those categories."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        message: "There was an error retrieving this companies categories."
      });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false
    }).exec();

    res.status(201).json(updatedCategory);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your category." });
  }
});

// get single category by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const retrievedCategory = await Category.findById(req.params.id).exec();
    if (retrievedCategory) {
      res.status(200).json(retrievedCategory);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that category."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this Category." });
  }
});

module.exports = router;
