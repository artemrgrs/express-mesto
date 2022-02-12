class NotFoundError extends Error {
  constructor(message) {
    const errorMessage = message || 'Не найдено';
    super(errorMessage);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
