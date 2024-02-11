export const httpErrors = [
  { errorCode: 400, errorMessage: 'Bad Request' },
  { errorCode: 401, errorMessage: 'Unauthorized' },
  { errorCode: 402, errorMessage: 'Payment Required' },
  { errorCode: 403, errorMessage: 'Forbidden' },
  { errorCode: 404, errorMessage: 'Not Found' },
  { errorCode: 405, errorMessage: 'Method Not Allowed' },
  { errorCode: 406, errorMessage: 'Not Acceptable' },
  { errorCode: 407, errorMessage: 'Proxy Authentication Required' },
  { errorCode: 408, errorMessage: 'Request Timeout' },
  { errorCode: 409, errorMessage: 'Conflict' },
  { errorCode: 410, errorMessage: 'Gone' },
  { errorCode: 411, errorMessage: 'Length Required' },
  { errorCode: 412, errorMessage: 'Precondition Failed' },
  { errorCode: 413, errorMessage: 'Payload Too Large' },
  { errorCode: 414, errorMessage: 'URI Too Long' },
  { errorCode: 415, errorMessage: 'Unsupported Media Type' },
  { errorCode: 416, errorMessage: 'Range Not Satisfiable' },
  { errorCode: 417, errorMessage: 'Expectation Failed' },
  { errorCode: 418, errorMessage: "I'm a teapot" },
  { errorCode: 422, errorMessage: 'Unprocessable Entity' },
  { errorCode: 429, errorMessage: 'Too Many Requests' },
  { errorCode: 500, errorMessage: 'Internal Server Error' },
  { errorCode: 501, errorMessage: 'Not Implemented' },
  { errorCode: 502, errorMessage: 'Bad Gateway' },
  { errorCode: 503, errorMessage: 'Service Unavailable' },
  { errorCode: 504, errorMessage: 'Gateway Timeout' },
  { errorCode: 505, errorMessage: 'HTTP Version Not Supported' },
];

export function getRandomHttpError() {
  const randomIndex = Math.floor(Math.random() * httpErrors.length);
  return httpErrors[randomIndex];
}