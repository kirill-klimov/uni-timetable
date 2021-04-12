const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.log(err);

  if (err.statusCode === 403) {
    const options = {
      httpOnly: true,
      expires: new Date(Date.now() + 10 * 1000)
    }
    res.cookie('token', '', options);
  }

  if (err.statusCode === 401) return res.status(err.statusCode).send();

  if (err.name === 'JsonWebTokenError') return res.status(401).send();

  if (err.code === 11000 && Object.keys(err.keyValue).includes('name'))
    err.message = "Пользователь уже существует";

  return res.status(statusCode).json({
    message: err.message
  });
}

export default globalErrorHandler;