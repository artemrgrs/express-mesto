class UnauthorizedError extends Error {
  constructor(message) {
    message = message || 'Необходима авторизация';
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
