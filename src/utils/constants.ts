export const ERRORS = {
  INTERNAL_SERVER: {
    code: 500,
    message: "Internal Server Error",
  },
  INVALID_CREDS: {
    code: 400,
    message: "Invalid Creds",
  },
  USER_NOT_FOUND: {
    code: 404,
    message: "User Not Found",
  },
  DUPLIACTE_USER: {
    code: 409,
    message: "Duplicate User",
  },
  INVALID_TOKEN: {
    code: 401,
    ACCESS: {
      expired: "Access Token Expired",
      message: "Invalid Access Token",
    },
    REFRESH: {
      expired: "Refresh Token Expired",
      message: "Invalid Refresh Token",
    },
  },
};
