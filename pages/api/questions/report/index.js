import dbConnect from "../../../utils/dbConnect";
import questionReportModel from "../../../models/questionReport"; // Adjust the path as needed
import { getSession } from "next-auth/react";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const { questionId, reason } = req.body;

        const newReport = new questionReportModel({
          questionId,
          userId: session.user.id,
          reason,
        });

        await newReport.save();

        res.status(200).json({ message: "Report submitted successfully" });
      } catch (error) {
        res.status(400).json({ error: "Error reporting question" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
};