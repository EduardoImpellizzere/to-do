import { readDataFromFile, writeDataToFile, paths } from "@/helpers/fileUtils";
import {
  OK,
  NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
} from "@/helpers/httpResponses";

const clearCompletedTodos = () => {
  const todos = readDataFromFile(paths.dbFilePath).todos;

  if (todos) {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    writeDataToFile(paths.dbFilePath, { todos: updatedTodos });
  }
};

const handlePostRequest = async (res) => {
  try {
    clearCompletedTodos();
    res.status(OK.status).json({ ...OK });
    console.log("POST /api/todo/refresh status: 200");
  } catch (e) {
    console.error("/api/todo/refresh POST error:", e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      await handlePostRequest(res);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(NOT_ALLOWED.status).json({ ...NOT_ALLOWED });
  }
};

export default handler;
