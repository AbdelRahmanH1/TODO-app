export const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.query, ...req.params };
    const result = schema.validate(data, { abortEarly: false });

    if (result.error) {
      const messages = result.error.details.map((err) => {
        return err.message;
      });
      return next(new Error(messages, { cause: 400 }));
    }
    return next();
  };
};
