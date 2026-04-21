export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}; 


{/*export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:");
  console.error("Message:", err.message);
  console.error("Stack:", err.stack);
  console.error("Route:", req.originalUrl);
  console.error("Method:", req.method);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}; */}