class ValidationError extends Error {
  constructor(message) {
    message = message || 'Данные не прошли валидацию';
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
