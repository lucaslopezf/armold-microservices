export const isValidNumber = (value: string): boolean => {
  const regex = new RegExp(/^\d+$/);

  return regex.test(value);
};
