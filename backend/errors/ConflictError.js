class ConflictError extends Error {
  constructor(message) {
    const errorMessage = message || 'Пользователь с таким email уже зарегистрирован';
    super(errorMessage);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
