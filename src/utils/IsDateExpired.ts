import moment from "moment";

export const IsDateExpired = (firstDate: string) => {
  const today = new Date();
  if (new Date(firstDate).setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0)) {
    return true;
  }

  return false;
};

export const IsDateExpiredMoment = (date: string) => {

  // Parse the input date using Moment.js
  const dateToCheck = moment(date);

  // Get the current date
  const currentDate = moment();

  // Compare the input date with the current date
  if (dateToCheck.isBefore(currentDate)) {
    return true;
  } else {
    return false;
  }
};
