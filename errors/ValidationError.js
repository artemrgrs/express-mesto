class ValidationError extends Error {
  constructor(message) {
    const errorMessage = message || 'Данные не прошли валидацию';
    super(errorMessage);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
