import { readDataFromFile, paths } from "@/helpers/fileUtils";
import {
  OK,
  NOT_FOUND,
  NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
} from "@/helpers/httpResponses";

const getQueryParamsValues = (queryParams, queryParamName) => {
  const filters = queryParams.getAll(queryParamName);
  const resultArray = filters[0].split(",");
  return resultArray;
};

const filterTodosByStatus = (todos, status) => {
  return todos.filter((todo) => todo.completed === status);
};

const filterTodosByImportance = (todos) => {
  return todos.filter((todo) => todo.important);
};

const handleGetRequest = async (req, res) => {
  try {
    const { query } = req;
    const queryParams = new URLSearchParams(query);

    if (!query.filter) {
      res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
      return;
    }

    const todos = readDataFromFile(paths.dbFilePath).todos;

    if (!todos) {
      res.status(NOT_FOUND.status).json({ ...NOT_FOUND });
    } else {
      let filteredTodos = [...todos];

      const filterValues = getQueryParamsValues(queryParams, "filter");

      filterValues.forEach((filter) => {
        switch (filter) {
          case "pending":
            filteredTodos = filterTodosByStatus(filteredTodos, false);
            break;

          case "completed":
            filteredTodos = filterTodosByStatus(filteredTodos, true);
            break;

          case "important":
            filteredTodos = filterTodosByImportance(filteredTodos);
            break;
        }
      });

      res.status(OK.status).json({ ...OK, todos: filteredTodos });
      console.log(
        `GET /api/todo/search?${decodeURIComponent(
          new URLSearchParams(query)
        )} status: 200`
      );
    }
  } catch (e) {
    console.error(`/api/todo/search GET error:`, e);
    res.status(INTERNAL_SERVER_ERROR.status).json({ ...INTERNAL_SERVER_ERROR });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(NOT_ALLOWED.status).json({ ...NOT_ALLOWED });
  }
};

export default handler;
