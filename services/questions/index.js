import axios from "axios";

//* Save question
export const saveQuestionMut = async (questionId) => {
  try {
    const response = await axios.post(
      "/api/questions/saveQuestion/" + questionId
    );
    if (response) return response.data;
  } catch {}
};

//* Note question
export const noteQuestionMut = async (data) => {
  try {
    const response = await axios.post("/api/questions/noteQuestion/", data);
    if (response) return response.data;
  } catch {}
};
