const router = require("express").Router();
const Project = require("../schema/ProjectSchema");
const { authenticate } = require("../auth/tokenHandlers");

router.post("/", authenticate, async (req, res) => {
  try {
    const newProject = await Project.create(req.body);

    res.status(201).json(newProject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your project." });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updateProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false
    }).exec();

    res.status(201).json(updateProject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error updating your project." });
  }
});

// retrieve single project
router.get("/single/:id", authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).exec();
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that project."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this project." });
  }
});

// retrieve all projects for a company
router.get("/company/:companyId", authenticate, async (req, res) => {
  try {
    const projects = await Project.find(req.params.companyId).exec();
    res.status(200).json(projects);
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving your projects." });
  }
});

module.exports = router;
