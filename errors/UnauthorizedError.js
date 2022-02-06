class UnauthorizedError extends Error {
  constructor(message) {
    const errorMessage = message || 'Необходима авторизация';
    super(errorMessage);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
