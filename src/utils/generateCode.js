export function generateCode(prefix = "X") {
  return prefix + "-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}
