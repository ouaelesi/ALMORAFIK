import { getToken } from "next-auth/jwt";
import userAnswerActions from "../../../../models/userAnswerActions";
import answerModel from "../../../../models/answer"; // Adjust the path as needed

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    console.log("got a request\n\n\n\n");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { _idResource, voteType } = req.body; // voteType can be 'upvote' or 'downvote'

  console.log("req.body", _idResource, voteType);
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

    const _idUser = session.id;

    // Check if the user has already voted on this resource
    const existingVote = await userAnswerActions.findOne({ userId: _idUser, answerId: _idResource });

    if (existingVote) {
      return res.status(400).json({ error: "User has already voted on this resource" });
    }

    // Create a new vote
    const newVote = new userAnswerActions({
      userId: _idUser,
      answerId: _idResource,
      note: voteType === "upvote" ? 1 : -1,
    });
    console.log("newVote", newVote);

    await newVote.save();

    // Update the vote count in the answer document
    const answer = await answerModel.findById(_idResource);
    if (answer) {
      answer.likes += voteType === "upvote" ? 1 : -1;
      await answer.save();
    }

    res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};