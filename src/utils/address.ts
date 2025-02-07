export const updateAddress = (add: unknown): string => {
  const strAddress = String(add);
  if (strAddress.length === 64) return strAddress;
  const content = strAddress.startsWith("0x") ? strAddress.slice(2) : strAddress;
  return `0x${content.padStart(64, "0")}`
};
