export const setCookie = (name: string, value: any, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const parseData = (dateStr: string): { date: string; time: string } => {
  const isoDate = dateStr.replace(" ", "T") + "Z";
  const date = new Date(isoDate);
  const options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone.toString(),
    hour: "numeric" as const,
    minute: "2-digit" as const,
    hour12: true,
  };

  const time = date.toLocaleTimeString([], options);
  const optionsDate = {
    year: "numeric" as const,
    month: "2-digit" as const,
    day: "numeric" as const
  };
  const dateFormatted = date.toLocaleDateString([], optionsDate);

  return { date: dateFormatted, time };
};
