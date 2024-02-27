import fs from "fs";
import path from "path";

export const readDataFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const paths = {
  dbOriginalFilePath: path.resolve("./", "dbOriginal.json"),
  dbFilePath: path.resolve("./", "db.json"),
};
