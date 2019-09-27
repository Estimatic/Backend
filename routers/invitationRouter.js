const router = require("express").Router();
const Invitation = require("../schema/InvitationSchema");
const { authenticate } = require("../auth/tokenHandlers");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const clientEndpoint = process.env.CLIENT_ENDPOINT || "http://localhost:3000";

router.post("/", authenticate, async (req, res) => {
  try {
    // create the invitation
    const { full_name, email, sender_name, company_id } = req.body;
    const newInvitation = await Invitation.create({
      full_name,
      email,
      sender_name,
      company_id
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${email}`,
      from: `${process.env.SENDGRID_EMAIL}`,
      subject: "Welcome to Estimatic",
      text: `${sender_name} has invited you to join the team on Estimatic!`,
      html: `<strong>Were SO happy to have you!</strong> <p>Simply follow the link below to complete your sign up!</p> <h2>${clientEndpoint}/joincompany/${newInvitation._id}</h2>`
    };
    const sentMail = await sgMail.send(msg);
    console.log("sent mail");
    res.status(201).json({ message: "Successfully sent your invitation!" });
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
  const id = req.params.id;
  try {
    const invitation = await Invitation.findById(id).exec();
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
