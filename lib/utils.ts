import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // difference in seconds

  const units: { label: string; seconds: number }[] = [
    { label: 'year', seconds: 60 * 60 * 24 * 365 },
    { label: 'month', seconds: 60 * 60 * 24 * 30 },
    { label: 'week', seconds: 60 * 60 * 24 * 7 },
    { label: 'day', seconds: 60 * 60 * 24 },
    { label: 'hour', seconds: 60 * 60 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.seconds);
    if (value >= 1) {
      return `${value} ${unit.label}${value > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

/**
 * Returns a formatted "Joined at Month Year" string for a given date.
 * @param date - A JavaScript Date object
 * @returns e.g. "Joined at October 2025"
 */
export const getJoinedAt = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${month} ${year}`;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentQuery = qs.parse(params);

  currentQuery[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentQuery
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove
}: RemoveUrlQueryParams) => {
  const currentQuery = qs.parse(params);

  keysToRemove.forEach((key) => delete currentQuery[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentQuery
    },
    { skipNull: true }
  );
};
