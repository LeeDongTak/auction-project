export const isEmpty = <T extends object>(obj: T) => {
  return Object.keys(obj).length === 0;
};
