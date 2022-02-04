class ForbiddenError extends Error {
  constructor(message) {
    message = message || 'Нет доступа';
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
