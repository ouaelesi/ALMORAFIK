import youtubeRes from "../../../models/ressources/youtubeRes";
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

  const youtube = new youtubeRes({
    channel: req.body.channel,
    description: req.body.description,
    userName: req.body.userName,
    image: req.body.image,
    tags: req.body.tags.split(","),
    followers: req.body.followers,
    link : req.body.link
  });
  console.log(youtube);
  youtube
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

// get all youtub channels
export const getYoutubeChannels = async (req, res) => {
  console.log("================")
  youtubeRes
    .find()
    .then((channel) => res.send(channel))
    .catch((err) =>
      res.status(400).send({ message: err.message || "error occured !!" })
    );
};
