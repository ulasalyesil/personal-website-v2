import React from "react";

export default function XIcon({ fill, border }) {
  return (
    <div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.4054 1.65527L8.07464 10.5727L1.36328 17.8229H2.87374L8.74952 11.4752L13.497 17.8229H18.6371L11.5927 8.40391L17.8395 1.65527H16.3291L10.9178 7.50137L6.54554 1.65527H1.4054ZM3.62664 2.76788H5.98803L16.4156 16.7101H14.0542L3.62664 2.76788Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
