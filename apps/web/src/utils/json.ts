export function safelyParseJSON<T>(json: string, valueOnError?: T): T {
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    parsed = valueOnError;
  }

  return parsed;
}
