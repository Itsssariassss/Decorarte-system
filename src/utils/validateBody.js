export const validateBody = (fields, body) => {
  for (const f of fields) {
    if (!body[f]) return `Falta el campo obligatorio: ${f}`;
  }
  return null;
};
