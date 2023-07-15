import React from 'react'

export default function PostsIcon({ fill, border }) {
  return (
    <div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 20 20"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.5175 3.14346C7.39308 3.11012 7.26331 3.10161 7.1356 3.11842C7.00789 3.13524 6.88474 3.17704 6.77318 3.24145C6.66163 3.30586 6.56386 3.39162 6.48545 3.49382C6.40704 3.59602 6.34953 3.71266 6.31621 3.83709L3.77709 13.3109C3.70998 13.5621 3.74535 13.8296 3.87542 14.0547C4.00548 14.2799 4.2196 14.4441 4.47071 14.5114L12.0504 16.5437C12.3017 16.6107 12.5693 16.5753 12.7945 16.445C13.0196 16.3148 13.1838 16.1005 13.2509 15.8493L15.79 6.37542C15.8571 6.12425 15.8218 5.85671 15.6917 5.6316C15.5616 5.40649 15.3475 5.24223 15.0964 5.17491L7.51672 3.14346H7.5175ZM5.17925 3.53264C5.25255 3.25891 5.37906 3.00229 5.55154 2.77745C5.72402 2.5526 5.9391 2.36394 6.1845 2.22222C6.4299 2.0805 6.70081 1.98851 6.98177 1.9515C7.26272 1.91449 7.54821 1.93318 7.82194 2.00651L15.4016 4.03717C15.6753 4.11064 15.9318 4.23729 16.1566 4.4099C16.3813 4.5825 16.5698 4.79769 16.7114 5.04316C16.853 5.28863 16.9448 5.55958 16.9817 5.84054C17.0185 6.1215 16.9997 6.40697 16.9262 6.68065L14.3871 16.1545C14.3138 16.4282 14.1873 16.6848 14.0148 16.9097C13.8423 17.1345 13.6272 17.3232 13.3818 17.4649C13.1364 17.6066 12.8655 17.6986 12.5846 17.7356C12.3036 17.7726 12.0181 17.754 11.7444 17.6806L4.16627 15.6492C3.61358 15.501 3.14239 15.1393 2.85634 14.6437C2.57028 14.1481 2.4928 13.5592 2.64092 13.0065L5.17925 3.53264Z"
          fill={border}
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.28917 5.51938C7.3092 5.44472 7.34374 5.37473 7.39082 5.31342C7.4379 5.25211 7.4966 5.20068 7.56356 5.16206C7.63053 5.12344 7.70444 5.09839 7.78109 5.08835C7.85773 5.0783 7.93561 5.08346 8.01026 5.10351L13.6919 6.62573C13.8427 6.6661 13.9712 6.76471 14.0493 6.89987C14.1273 7.03503 14.1485 7.19566 14.1082 7.34643C14.0678 7.4972 13.9692 7.62576 13.834 7.70382C13.6989 7.78188 13.5382 7.80306 13.3875 7.76269L7.70503 6.24047C7.63037 6.22044 7.56039 6.1859 7.49908 6.13882C7.43777 6.09174 7.38634 6.03304 7.34772 5.96608C7.3091 5.89911 7.28405 5.8252 7.274 5.74855C7.26396 5.67191 7.26911 5.59403 7.28917 5.51938ZM6.62928 7.98317C6.66957 7.83241 6.76808 7.70383 6.90316 7.6257C7.03824 7.54756 7.19882 7.52628 7.34959 7.56652L13.032 9.08874C13.1067 9.10873 13.1767 9.14324 13.2381 9.1903C13.2995 9.23735 13.351 9.29604 13.3897 9.363C13.4284 9.42995 13.4535 9.50388 13.4636 9.58055C13.4737 9.65722 13.4686 9.73513 13.4487 9.80983C13.4287 9.88454 13.3942 9.95457 13.3471 10.0159C13.3 10.0773 13.2414 10.1288 13.1744 10.1675C13.1074 10.2062 13.0335 10.2313 12.9568 10.2414C12.8802 10.2515 12.8023 10.2465 12.7276 10.2265L7.04515 8.70348C6.97048 8.68345 6.9005 8.64891 6.83919 8.60183C6.77788 8.55475 6.72645 8.49605 6.68783 8.42909C6.64921 8.36212 6.62416 8.28821 6.61412 8.21156C6.60407 8.13491 6.60922 8.05783 6.62928 7.98317ZM5.96939 10.4462C6.00985 10.2956 6.10844 10.1672 6.24349 10.0892C6.37855 10.0112 6.53904 9.99005 6.6897 10.0303L10.4795 11.0449C10.5543 11.0649 10.6243 11.0994 10.6857 11.1464C10.747 11.1935 10.7985 11.2522 10.8372 11.3191C10.8759 11.3861 10.901 11.46 10.9111 11.5367C10.9213 11.6133 10.9162 11.6913 10.8962 11.766C10.8762 11.8407 10.8417 11.9107 10.7946 11.9721C10.7476 12.0334 10.6889 12.0849 10.6219 12.1236C10.555 12.1623 10.4811 12.1874 10.4044 12.1976C10.3277 12.2077 10.2498 12.2026 10.1751 12.1826L6.38526 11.1665C6.23464 11.126 6.10625 11.0274 6.02827 10.8924C5.9503 10.7573 5.92912 10.5968 5.96939 10.4462Z"
          fill={border}
        />
      </svg>
    </div>
  );
}