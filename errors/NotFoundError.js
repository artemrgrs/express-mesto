class NotFoundError extends Error {
  constructor(message) {
    message = message || 'Не найдено';
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
