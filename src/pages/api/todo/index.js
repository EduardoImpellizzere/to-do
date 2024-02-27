import { readDataFromFile, writeDataToFile, paths } from "@/helpers/fileUtils";
import { delay } from "@/helpers/requests";
import {
  OK,
  CREATED,
  NOT_FOUND,
  NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
} from "@/helpers/httpResponses";

const delayTime = 1000;

const getLastId = (todos) => {
  const lastTodo = todos[todos.length - 1];
  return lastTodo ? lastTodo.id : 0;
};

const handleGetRequest = async (res) => {
  try {
    await delay(delayTime);
    const todos = readDataFromFile(paths.dbFilePath).todos;

    if (!todos) {
      res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
    } else {
      res.status(OK.status).json({ ...OK, todos });
      console.log("GET /api/todo status: 200");
    }
  } catch (e) {
    console.error("/api/todo GET error:", e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handlePostRequest = async (req, res) => {
  try {
    await delay(delayTime);

    const currentData = readDataFromFile(paths.dbFilePath);
    const currentTodos = currentData.todos;

    const lastId = getLastId(currentTodos);

    const newTodo = {
      id: lastId + 1,
      ...req.body,
    };

    currentTodos.push(newTodo);

    writeDataToFile(paths.dbFilePath, { todos: currentTodos });

    res.status(CREATED.status).json({ ...CREATED, todo: newTodo });
    console.log("POST /api/todo status: 200");
  } catch (e) {
    console.error("/api/todo POST error:", e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(res);
      break;

    case "POST":
      await handlePostRequest(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(NOT_ALLOWED.status).json({ ...NOT_ALLOWED });
  }
};

export default handler;
