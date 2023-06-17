// Source: https://stackoverflow.com/a/2117523
export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID !== undefined) {
    return crypto.randomUUID();
  }

  return (
    String([1e7]) +
    String(-1e3) +
    String(-4e3) +
    String(-8e3) +
    String(-1e11)
  ).replace(/[018]/g, (c: string) => {
    const randomValues = crypto.getRandomValues(new Uint8Array(1));
    return (
      parseInt(c, 10) ^
      (randomValues[0] & (15 >> (parseInt(c, 10) / 4)))
    ).toString(16);
  });
}
