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

const handleGetRequest = async (id, res) => {
  try {
    await delay(delayTime);

    const todos = readDataFromFile(paths.dbFilePath).todos;

    if (!todos) {
      res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
    } else {
      const todo = todos.find((todo) => todo.id === id);

      if (todo) {
        res.status(OK.status).json({ ...OK, todo });
        console.log(`GET /api/todo/${id} status: 200`);
      } else {
        res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
      }
    }
  } catch (e) {
    console.error(`/api/todo/${id} GET error:`, e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handlePutRequest = async (id, req, res) => {
  try {
    const currentData = readDataFromFile(paths.dbFilePath);
    const currentTodos = currentData.todos;

    const todoIndex = currentTodos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
      const updatedTodo = {
        ...currentTodos[todoIndex],
        id,
        ...req.body,
      };

      currentTodos[todoIndex] = updatedTodo;

      writeDataToFile(paths.dbFilePath, { todos: currentTodos });

      res.status(OK.status).json({ ...OK, todo: updatedTodo });
      console.log(`PUT /api/todo/${id} status: 200`);
    } else {
      res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
    }
  } catch (e) {
    console.error(`/api/todo/${id} PUT error:`, e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handleDeleteRequest = async (id, res) => {
  try {
    await delay(delayTime);

    const currentData = readDataFromFile(paths.dbFilePath);
    const currentTodos = currentData.todos;

    const filteredTodos = currentTodos.filter((todo) => todo.id !== id);

    if (filteredTodos.length < currentTodos.length) {
      writeDataToFile(paths.dbFilePath, { todos: filteredTodos });

      res
        .status(OK.status)
        .json({ ...OK, message: `Task with id ${id} deleted successfully` });
      console.log(`DELETE /api/todo/${id} status: 200`);
    } else {
      res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
    }
  } catch (e) {
    console.error(`/api/todo/${id} DELETE error:`, e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handler = async (req, res) => {
  const id = parseInt(req?.query?.id, 10);

  switch (req.method) {
    case "GET":
      await handleGetRequest(id, res);
      break;

    case "PUT":
      await handlePutRequest(id, req, res);
      break;

    case "DELETE":
      await handleDeleteRequest(id, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(NOT_ALLOWED.status).json({ ...NOT_ALLOWED });
  }
};

export default handler;
