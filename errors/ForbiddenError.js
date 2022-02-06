class ForbiddenError extends Error {
  constructor(message) {
    const errorMessage = message || 'Нет доступа';
    super(errorMessage);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
