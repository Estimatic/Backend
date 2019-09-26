const router = require("express").Router();
const Invitation = require("../schema/InvitationSchema");
const { authenticate } = require("../auth/tokenHandlers");

router.post("/", authenticate, async (req, res) => {
  try {
    const { full_name, email, sender_name, company_id } = req.body;
    const newInvitation = await Invitation.create({
      full_name,
      email,
      sender_name,
      company_id
    });

    res.status(201).json(newInvitation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error creating your invitation." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedInvitation = await Invitation.findByIdAndDelete(id).exec();

    res.status(201).json(deletedInvitation);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error deleting your invitation." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id).exec();
    if (invitation) {
      res.status(200).json(invitation);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that invitation."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this invitation." });
  }
});

module.exports = router;
