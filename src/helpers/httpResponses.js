export const OK = {
  status: 200,
  success: true,
};

export const CREATED = {
  status: 201,
  success: true,
  message: "Created",
};

export const BAD_REQUEST = {
  status: 400,
  success: false,
  message: "Bad Request",
};

export const NOT_FOUND = {
  status: 404,
  success: false,
  error: "Not Found",
};

export const NOT_ALLOWED = {
  status: 405,
  success: false,
  error: "Method Not Allowed",
};

export const INTERNAL_SERVER_ERROR = {
  status: 500,
  success: false,
  error: "Internal Server Error",
};
