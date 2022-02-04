class BadRequest extends Error {
  constructor(message) {
    message = message || 'Указаны некорректные данные';
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
