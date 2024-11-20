import userQuestionsActions from "../../../models/userQuestionActions";
import { getToken  } from "next-auth/jwt";

export const noteResource = async (req, res) => {
  const { _idResource:questionId, voteType } = req.body; // voteType can be 'upvote' or 'downvote'

  if (!["upvote", "downvote"].includes(voteType)) {
    return res.status(400).json({ error: "Invalid vote type" });
  }

  try {
    // Check if the user is authenticated
    const secret = process.env.NEXTAUTH_SECRET;
    const session = await getToken({ req, secret });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.id; 

    // Check if the user has already voted on this resource
    const existingVote = await userQuestionsActions.findOne({ userId, questionId });
    console.log(userId, questionId, existingVote);

    if (existingVote) {
      if ((existingVote.note === 1 && voteType === "upvote") || (existingVote.note === -1 && voteType === "downvote")) {
      return res.status(400).json({ error: "User has already voted on this resource" });
      } else {
      // Update the existing vote
      existingVote.note = voteType === "upvote" ? 1 : -1;
      await existingVote.save();
      return res.status(200).json({ message: "Vote updated successfully" });
      }
    } else {
      // Create a new vote
      const newVote = new userQuestionsActions({
      userId,
      questionId,
      note: voteType === "upvote" ? 1 : -1,
      });
      await newVote.save();
    }

    await newVote.save();

    // Fetch the question and add to it (if needed)
    // const question = await Question.findById(_idResource); // Assuming you have a Question model
    // question.votes += voteType === "upvote" ? 1 : -1;
    // await question.save();

    res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Internal server error" });
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
