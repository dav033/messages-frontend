export const setCookie = (name: string, value: any, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const parseData = (dateStr: string) => {
  if (dateStr) {
    const [datePart, timePart] = dateStr.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hours, minutes] = timePart.split(":");

    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes}`;

    return { date: formattedDate, time: formattedTime };
  } else return { date: "", time: "" };
};
