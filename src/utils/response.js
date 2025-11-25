export const success = (res, data, message = "OK") => {
  return res.json({ success: true, message, data });
};

export const fail = (res, error = "Error interno", code = 400) => {
  return res.status(code).json({ success: false, error });
};
