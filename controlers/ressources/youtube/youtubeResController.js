import resourcesModal from "../../../models/ressource.js";
import { IsLoggedIn } from "../../../utils/IsLoggedIn";

// Add a youtub channel
export const addYoutubRes = async (req, res) => {
  // todo activate the login verivication
  //   if (!(await IsLoggedIn(req))) {
  //     res.status(400).send({ message: "User Not Logged In!" });
  //     return;
  //   }
  if (!req.body) {
    res.status(400).send({ message: "request empty!!", data: req.body });
    return;
  }

  const resource = new resourcesModal({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    subTitle: req.body.subTitle,
    image: req.body.image,
    tags: req.body.tags.split(","),
    link: req.body.link,
  });

  console.log('its working ')
  resource
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some errors occured",
      });
    });
};

//--------------------------------------------------------
// get all resources
export const getAllResources_Mut = async (req, res) => {
  resourcesModal
    .find()
    .then((channel) => res.send(channel))
    .catch((err) =>
      res.status(400).send({ message: err.message || "error occured !!" })
    );
};

//--------------------------------------------------------
// get all youtub channels
export const getYoutubeChannels = async (req, res) => {
  resourcesModal
    .find({ type: "youtube" })
    .then((channel) => res.send(channel))
    .catch((err) =>
      res.status(400).send({ message: err.message || "error occured !!" })
    );
};

// ---------------------------------
// Get all books

// get all books
export const getBooksMut = async (req, res) => {
  resourcesModal
    .find({ type: "book" })
    .then((channel) => res.send(channel))
    .catch((err) =>
      res.status(400).send({ message: err.message || "error occured !!" })
    );
};
