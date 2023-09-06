import resourceUserActions from "../../../models/ressources/resourceUserActions";

// Add a youtub channel
export const noteResource = async (req, res) => {
  // todo activate the login verivication
  //   if (!(await IsLoggedIn(req))) {
  //     res.status(400).send({ message: "User Not Logged In!" });
  //     return;
  //   }
  if (!req.body) {
    res.status(400).send({ message: "request empty!!", data: req.body });
    return;
  }

  let userAction = await resourceUserActions.findOne({
    _idUser: req.body._idUser,
    _idResource: req.body._idResource,
  });

  if (userAction) {
    resourceUserActions
      .updateOne(
        { _idUser: req.body._idUser, _idResource: req.body._idResource },
        { $set: { note: req.body.note } }
      )
      .then((data) =>
        res.status(200).send({
          message: "note saved successfuly",
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some errors occured",
        });
      });
  } else {
    const reUserAction = new resourceUserActions({
      _idUser: req.body._idUser,
      _idResource: req.body._idResource,
      note: req.body.note,
    });
    console.log("here 3");
    reUserAction
      .save()
      .then((data) =>
        res.status(200).send({
          message: "note saved successfuly",
          data: data,
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some errors occured",
        });
      });
  }
};

// ______________________________________________

// save ressources
export const saveResource = async (req, res) => {
  // todo activate the login verivication
  //   if (!(await IsLoggedIn(req))) {
  //     res.status(400).send({ message: "User Not Logged In!" });
  //     return;
  //   }
  if (!req.body) {
    res.status(400).send({ message: "request empty!!", data: req.body });
    return;
  }

  let userAction = await resourceUserActions.findOne({
    _idUser: req.body._idUser,
    _idResource: req.body._idResource,
  });

  if (userAction) {
    console.log(userAction);
    resourceUserActions
      .updateOne(
        { _idUser: req.body._idUser, _idResource: req.body._idResource },
        { $set: { saved: !userAction.saved } }
      )
      .then((data) =>
        res.status(200).send({
          message: "ressource saved!",
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some errors occured",
        });
      });
  } else {
    const reUserAction = new resourceUserActions({
      _idUser: req.body._idUser,
      _idResource: req.body._idResource,
      saved: true,
    });

    reUserAction
      .save()
      .then((data) =>
        res.status(200).send({
          message: "resources saved!",
          data: data,
        })
      )
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some errors occured",
        });
      });
  }
};
