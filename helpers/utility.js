class NotFoundError extends Error {
  constructor(message, type) {
    super(message);
    this.name = "NotFoundError";
    this.type = type;
  }
}

const _NotFoundError = NotFoundError;
export { _NotFoundError as NotFoundError };
