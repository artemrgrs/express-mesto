class BadRequest extends Error {
  constructor(message) {
    const errorMessage = message || 'Указаны некорректные данные';
    super(errorMessage);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
