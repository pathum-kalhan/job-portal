
function stringToBoolean(value: string) {
  if (typeof value === "boolean") return value;
  if (value === "true") {
    return true;
  }
  return false;
}

export { stringToBoolean };
