export function twentyFourToTwelveHours(time24: string) {
  const [hours, minutes] = time24.split(":").map(Number);
  const amOrPm = hours >= 12 ? "PM" : "AM";
  let hours12 = hours % 12;
  hours12 = hours12 ? hours12 : 12;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${hours12}:${minutesStr} ${amOrPm}`;
}
