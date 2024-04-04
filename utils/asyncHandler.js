const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((e) => {
      return next(new Error(e.message, { cause: 500 }));
    });
  };
};
export default asyncHandler;
