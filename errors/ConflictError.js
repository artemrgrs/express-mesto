class ConflictError extends Error {
  constructor(message) {
    message = message || 'Пользователь с таким email уже зарегистрирован';
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
