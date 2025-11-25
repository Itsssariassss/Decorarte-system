export default function logger(message, error = null) {
  const timestamp = new Date().toISOString();

  if (error) {
    console.error(`[${timestamp}] ❌ ${message}`, error);
  } else {
    console.log(`[${timestamp}] ✔️ ${message}`);
  }
}
