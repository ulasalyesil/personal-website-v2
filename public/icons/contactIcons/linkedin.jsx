import React from "react";

export default function LinkedinIcon({ fill, border }) {
  return (
    <div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3333 6.66669C14.6593 6.66669 15.9311 7.19347 16.8688 8.13115C17.8065 9.06884 18.3333 10.3406 18.3333 11.6667V17.5H14.9999V11.6667C14.9999 11.2247 14.8243 10.8007 14.5118 10.4882C14.1992 10.1756 13.7753 10 13.3333 10C12.8912 10 12.4673 10.1756 12.1547 10.4882C11.8422 10.8007 11.6666 11.2247 11.6666 11.6667V17.5H8.33325V11.6667C8.33325 10.3406 8.86004 9.06884 9.79772 8.13115C10.7354 7.19347 12.0072 6.66669 13.3333 6.66669Z"
          stroke={border}
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.00008 7.5H1.66675V17.5H5.00008V7.5Z"
          stroke={border}
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33341 5.00002C4.25389 5.00002 5.00008 4.25383 5.00008 3.33335C5.00008 2.41288 4.25389 1.66669 3.33341 1.66669C2.41294 1.66669 1.66675 2.41288 1.66675 3.33335C1.66675 4.25383 2.41294 5.00002 3.33341 5.00002Z"
          stroke={border}
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
