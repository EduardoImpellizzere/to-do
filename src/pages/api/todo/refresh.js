import { readDataFromFile, writeDataToFile, paths } from "@/helpers/fileUtils";
import { delay } from "@/helpers/requests";
import {
  OK,
  NOT_ALLOWED,
  INTERNAL_SERVER_ERROR,
} from "@/helpers/httpResponses";

const delayTime = 1000;

const resetData = () => {
  const originalData = readDataFromFile(paths.dbOriginalFilePath);
  writeDataToFile(paths.dbFilePath, originalData);
};

const handlePostRequest = async (req, res) => {
  try {
    await delay(delayTime);

    resetData();
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
      await handlePostRequest(req, res);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(NOT_ALLOWED.status).json({ ...NOT_ALLOWED });
  }
};

export default handler;
