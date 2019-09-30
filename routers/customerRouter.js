const router = require("express").Router();
const Customer = require("../schema/CustomerSchema.js");
const { authenticate } = require("../auth/tokenHandlers");

router.post("/", authenticate, async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);

    res.status(201).json(newCustomer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your Customer." });
  }
});

// get all customers in a company
router.get("/company/:id", async (req, res) => {
  try {
    const customers = await Customer.find({ company_id: req.params.id }).exec();

    if (customers) {
      res.status(200).json(customers);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find those customers."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this companies users." });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const id = req.params.id;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false
    }).exec();

    res.status(201).json(updatedCustomer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your Customer." });
  }
});
// get single Customer by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).exec();
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that Customer."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this Customer." });
  }
});

module.exports = router;
