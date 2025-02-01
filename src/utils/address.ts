export const updateAddress = (add: unknown): string => {
  const strAddress = String(add);
  if (strAddress.length === 64) return strAddress;
  const prefix = strAddress.startsWith("0x") ? strAddress : `0x${strAddress}`;
  return prefix.padEnd(64, "0");
};
