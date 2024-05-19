export const getMessageFromLocalStorage = (): string | null => {
  return localStorage.getItem("message");
};

export const setMessageToLocalStorage = (message: string): void => {
  localStorage.setItem("message", message);
  const nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0); // Set the expiration time to midnight the next day
  localStorage.setItem("expirationTime", nextDay.toISOString());
};

export const clearMessageFromLocalStorage = (): void => {
  localStorage.removeItem("message");
  localStorage.removeItem("expirationTime");
};

export const shouldClearLocalStorage = (): boolean => {
  const expirationTime = localStorage.getItem("expirationTime");
  if (!expirationTime) return false;
  return new Date() >= new Date(expirationTime);
};
