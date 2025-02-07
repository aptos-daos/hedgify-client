import { intervalToDuration } from 'date-fns';

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatPercentage = (value: number): string => {
  return `${value >= 0 ? "+" : ""}${value}%`;
};

const getKebab = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const getTicker = (str: string) => {
  const arr = str.replace(/[^\w\s]/g, "").split(" ");
  if (arr.length > 2) {
    return arr
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  }
  return str.replaceAll(" ", "").substring(0, 3).toUpperCase();
};

const getLabel = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getSecondsTime = (val: unknown): number => {
  if (typeof val === "string") {
    const date = new Date(val);
    return isNaN(date.getTime())
      ? getSecondsTime(new Date())
      : getSecondsTime(date);
  }

  if (typeof val === "number") {
    return Math.floor(val > 1e12 ? val / 1000 : val);
  }

  if (val instanceof Date) {
    return getSecondsTime(val.getTime());
  }

  return getSecondsTime(new Date()); // Default to current time if input is invalid
};

const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * @param futureDate - The future date to calculate time difference to
 * @returns Formatted time difference string
 */
function getStartsInFormat(futureDate: Date): string {
  const now = new Date();
  
  // Calculate the duration between now and the future date
  const duration = intervalToDuration({
    start: now,
    end: futureDate
  });
  
  // Extract all time units with fallback to 0
  const months = duration.months ?? 0;
  const days = duration.days ?? 0;
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;
  const seconds = duration.seconds ?? 0;
  
  // Build the string parts conditionally
  const parts: string[] = [];
  if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hr`);
  if (minutes > 0) parts.push(`${minutes} min`);
  if (seconds > 0) parts.push(`${seconds} sec`);
  
  return parts.join(' ') || '0 sec';
}


export {
  formatNumber,
  formatCurrency,
  formatPercentage,
  getKebab,
  getTicker,
  getLabel,
  getSecondsTime,
  formatAddress,
  getStartsInFormat
};
