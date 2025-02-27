import React from 'react';
import { IconProps } from '@radix-ui/react-icons/dist/types';

const HeartIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ ...props }, forwardedRef) => {
    return React.createElement(
      'svg',
      Object.assign(
        {
          width: '58',
          height: '55',
          viewBox: '0 0 58 55',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          ref: forwardedRef,
          preserveAspectRatio: 'xMidYMid meet',
        },
        props
      ),
      React.createElement('g', { filter: 'url(#filter0_f_693_14740)' },
        React.createElement('path', {
          d: "M29 43.2447L26.39 40.9494C23.36 38.2714 20.855 35.9613 18.875 34.0191C16.895 32.0769 15.32 30.333 14.15 28.7874C12.98 27.2431 12.1628 25.8235 11.6984 24.5287C11.234 23.2338 11.0012 21.9096 11 20.5559C11 17.7897 11.945 15.4796 13.835 13.6257C15.725 11.7717 18.08 10.8447 20.9 10.8447C22.46 10.8447 23.945 11.1684 25.355 11.8158C26.765 12.4633 27.98 13.3755 29 14.5526C30.02 13.3755 31.235 12.4633 32.645 11.8158C34.055 11.1684 35.54 10.8447 37.1 10.8447C39.92 10.8447 42.275 11.7717 44.165 13.6257C46.055 15.4796 47 17.7897 47 20.5559C47 21.9096 46.7672 23.2338 46.3016 24.5287C45.836 25.8235 45.0188 27.2431 43.85 28.7874C42.68 30.333 41.105 32.0769 39.125 34.0191C37.145 35.9613 34.64 38.2714 31.61 40.9494L29 43.2447Z",
          fill: "url(#paint0_linear_693_14740)",
        }),
        React.createElement('path', {
          d: "M29 43.2447L26.39 40.9494C23.36 38.2714 20.855 35.9613 18.875 34.0191C16.895 32.0769 15.32 30.333 14.15 28.7874C12.98 27.2431 12.1628 25.8235 11.6984 24.5287C11.234 23.2338 11.0012 21.9096 11 20.5559C11 17.7897 11.945 15.4796 13.835 13.6257C15.725 11.7717 18.08 10.8447 20.9 10.8447C22.46 10.8447 23.945 11.1684 25.355 11.8158C26.765 12.4633 27.98 13.3755 29 14.5526C30.02 13.3755 31.235 12.4633 32.645 11.8158C34.055 11.1684 35.54 10.8447 37.1 10.8447C39.92 10.8447 42.275 11.7717 44.165 13.6257C46.055 15.4796 47 17.7897 47 20.5559C47 21.9096 46.7672 23.2338 46.3016 24.5287C45.836 25.8235 45.0188 27.2431 43.85 28.7874C42.68 30.333 41.105 32.0769 39.125 34.0191C37.145 35.9613 34.64 38.2714 31.61 40.9494L29 43.2447Z",
          fill: "url(#paint1_radial_693_14740)",
          fillOpacity: "0.7"
        }),
        React.createElement('path', {
          d: "M29 43.2447L26.39 40.9494C23.36 38.2714 20.855 35.9613 18.875 34.0191C16.895 32.0769 15.32 30.333 14.15 28.7874C12.98 27.2431 12.1628 25.8235 11.6984 24.5287C11.234 23.2338 11.0012 21.9096 11 20.5559C11 17.7897 11.945 15.4796 13.835 13.6257C15.725 11.7717 18.08 10.8447 20.9 10.8447C22.46 10.8447 23.945 11.1684 25.355 11.8158C26.765 12.4633 27.98 13.3755 29 14.5526C30.02 13.3755 31.235 12.4633 32.645 11.8158C34.055 11.1684 35.54 10.8447 37.1 10.8447C39.92 10.8447 42.275 11.7717 44.165 13.6257C46.055 15.4796 47 17.7897 47 20.5559C47 21.9096 46.7672 23.2338 46.3016 24.5287C45.836 25.8235 45.0188 27.2431 43.85 28.7874C42.68 30.333 41.105 32.0769 39.125 34.0191C37.145 35.9613 34.64 38.2714 31.61 40.9494L29 43.2447Z",
          fill: "url(#paint2_radial_693_14740)",
          fillOpacity: "0.7"
        }),
      ),
      React.createElement('path', {
        d: "M29.001 42.945L26.536 40.735C23.6743 38.1567 21.3085 35.9325 19.4385 34.0625C17.5685 32.1925 16.081 30.5135 14.976 29.0254C13.871 27.5385 13.0992 26.1717 12.6606 24.925C12.222 23.6783 12.0021 22.4033 12.001 21.1C12.001 18.4367 12.8935 16.2125 14.6785 14.4275C16.4635 12.6425 18.6876 11.75 21.351 11.75C22.8243 11.75 24.2268 12.0617 25.5585 12.685C26.8901 13.3083 28.0376 14.1867 29.001 15.32C29.9643 14.1867 31.1118 13.3083 32.4435 12.685C33.7751 12.0617 35.1776 11.75 36.651 11.75C39.3143 11.75 41.5385 12.6425 43.3235 14.4275C45.1085 16.2125 46.001 18.4367 46.001 21.1C46.001 22.4033 45.7811 23.6783 45.3414 24.925C44.9016 26.1717 44.1298 27.5385 43.026 29.0254C41.921 30.5135 40.4335 32.1925 38.5635 34.0625C36.6935 35.9325 34.3276 38.1567 31.466 40.735L29.001 42.945Z",
        fill: "#141215",
      }),
      React.createElement('path', {
        d: "M29.001 42.945L26.536 40.735C23.6743 38.1567 21.3085 35.9325 19.4385 34.0625C17.5685 32.1925 16.081 30.5135 14.976 29.0254C13.871 27.5385 13.0992 26.1717 12.6606 24.925C12.222 23.6783 12.0021 22.4033 12.001 21.1C12.001 18.4367 12.8935 16.2125 14.6785 14.4275C16.4635 12.6425 18.6876 11.75 21.351 11.75C22.8243 11.75 24.2268 12.0617 25.5585 12.685C26.8901 13.3083 28.0376 14.1867 29.001 15.32C29.9643 14.1867 31.1118 13.3083 32.4435 12.685C33.7751 12.0617 35.1776 11.75 36.651 11.75C39.3143 11.75 41.5385 12.6425 43.3235 14.4275C45.1085 16.2125 46.001 18.4367 46.001 21.1C46.001 22.4033 45.7811 23.6783 45.3414 24.925C44.9016 26.1717 44.1298 27.5385 43.026 29.0254C41.921 30.5135 40.4335 32.1925 38.5635 34.0625C36.6935 35.9325 34.3276 38.1567 31.466 40.735L29.001 42.945Z",
        fill: "url(#paint3_linear_693_14740)",
      }),
      React.createElement('path', {
        d: "M29.001 42.945L26.536 40.735C23.6743 38.1567 21.3085 35.9325 19.4385 34.0625C17.5685 32.1925 16.081 30.5135 14.976 29.0254C13.871 27.5385 13.0992 26.1717 12.6606 24.925C12.222 23.6783 12.0021 22.4033 12.001 21.1C12.001 18.4367 12.8935 16.2125 14.6785 14.4275C16.4635 12.6425 18.6876 11.75 21.351 11.75C22.8243 11.75 24.2268 12.0617 25.5585 12.685C26.8901 13.3083 28.0376 14.1867 29.001 15.32C29.9643 14.1867 31.1118 13.3083 32.4435 12.685C33.7751 12.0617 35.1776 11.75 36.651 11.75C39.3143 11.75 41.5385 12.6425 43.3235 14.4275C45.1085 16.2125 46.001 18.4367 46.001 21.1C46.001 22.4033 45.7811 23.6783 45.3414 24.925C44.9016 26.1717 44.1298 27.5385 43.026 29.0254C41.921 30.5135 40.4335 32.1925 38.5635 34.0625C36.6935 35.9325 34.3276 38.1567 31.466 40.735L29.001 42.945Z",
        fill: "url(#paint4_radial_693_14740)",
        fillOpacity: "0.7",
      }),
      React.createElement('path', {
        d: "M29.001 42.945L26.536 40.735C23.6743 38.1567 21.3085 35.9325 19.4385 34.0625C17.5685 32.1925 16.081 30.5135 14.976 29.0254C13.871 27.5385 13.0992 26.1717 12.6606 24.925C12.222 23.6783 12.0021 22.4033 12.001 21.1C12.001 18.4367 12.8935 16.2125 14.6785 14.4275C16.4635 12.6425 18.6876 11.75 21.351 11.75C22.8243 11.75 24.2268 12.0617 25.5585 12.685C26.8901 13.3083 28.0376 14.1867 29.001 15.32C29.9643 14.1867 31.1118 13.3083 32.4435 12.685C33.7751 12.0617 35.1776 11.75 36.651 11.75C39.3143 11.75 41.5385 12.6425 43.3235 14.4275C45.1085 16.2125 46.001 18.4367 46.001 21.1C46.001 22.4033 45.7811 23.6783 45.3414 24.925C44.9016 26.1717 44.1298 27.5385 43.026 29.0254C41.921 30.5135 40.4335 32.1925 38.5635 34.0625C36.6935 35.9325 34.3276 38.1567 31.466 40.735L29.001 42.945Z",
        fill: "url(#paint5_radial_693_14740)",
        fillOpacity: "0.7",
      }),
      React.createElement('path', {
        d: "M15.4574 28.6676L15.4573 28.6675C14.375 27.2111 13.6387 25.8979 13.2263 24.7258C12.8099 23.5421 12.6018 22.3343 12.6007 21.0997C12.6008 18.5859 13.4368 16.5174 15.1025 14.8517C16.7683 13.1859 18.8368 12.3499 21.3507 12.3499C22.7363 12.3499 24.052 12.6424 25.3039 13.2284C26.5567 13.8148 27.6353 14.64 28.5436 15.7085L29.0007 16.2464L29.4579 15.7085C30.3662 14.64 31.4448 13.8148 32.6976 13.2284C33.9495 12.6424 35.2651 12.3499 36.6507 12.3499C39.1647 12.3499 41.2332 13.1859 42.899 14.8517C44.5647 16.5175 45.4007 18.586 45.4007 21.0999C45.4007 22.3343 45.1927 23.5419 44.7753 24.7254C44.3617 25.8978 43.6253 27.2112 42.544 28.6676C41.4622 30.1245 39.9962 31.781 38.139 33.6382C36.2789 35.4983 33.9213 37.7149 31.0643 40.289C31.0642 40.2891 31.0642 40.2891 31.0641 40.2892L29.0007 42.1391L26.9374 40.2892C26.9372 40.2891 26.9371 40.2889 26.937 40.2888C24.0801 37.7148 21.7226 35.4982 19.8625 33.6382C18.0053 31.781 16.5393 30.1245 15.4574 28.6676Z",
        stroke: "white",
        strokeOpacity: "0.3",
        strokeWidth: "1.2",
      }),
      React.createElement('defs', {},
        React.createElement('filter', {
          id: "filter0_f_693_14740",
          x: "0.2",
          y: "0.0447264",
          width: "57.6",
          height: "54",
          filterUnits: "userSpaceOnUse",
          colorInterpolationFilters: "sRGB",
        },
          React.createElement('feFlood', { floodOpacity: "0", result: "BackgroundImageFix" }),
          React.createElement('feBlend', { mode: "normal", in: "SourceGraphic", in2: "BackgroundImageFix", result: "shape" }),
          React.createElement('feGaussianBlur', { stdDeviation: "5.4", result: "effect1_foregroundBlur_693_14740" }),
        ),
        React.createElement("linearGradient", {
            id: "paint0_linear_693_14740",
            x1: "29",
            y1: "10.8447",
            x2: "29",
            y2: "43.2447",
            gradientUnits: "userSpaceOnUse"
          },
          React.createElement("stop", { stopColor: "#BD34FE" }),
          React.createElement("stop", { offset: "1", stopColor: "#AD00FF", stopOpacity: "0.24" })
        ),
        React.createElement('radialGradient', {
            id: "paint1_radial_693_14740",
            cx: "0",
            cy: "0",
            r: "1",
            gradientUnits: "userSpaceOnUse",
            gradientTransform: "translate(40.4345 13.6435) rotate(115.368) scale(29.6563 32.7229)",
          },
          React.createElement("stop", { stopColor: "#FF9CF5" }),
          React.createElement("stop", { offset: "1", stopColor: "#FFBFF9", stopOpacity: "0" })
        ),
        React.createElement('radialGradient', {
            id: "paint2_radial_693_14740",
            cx: "0",
            cy: "0",
            r: "1",
            gradientUnits: "userSpaceOnUse",
            gradientTransform: "translate(11.2109 19.2521) rotate(23.4546) scale(36.0107 38.7396)",
          },
          React.createElement("stop", { stopColor: "white" }),
          React.createElement("stop", { offset: "1", stopColor: "white", stopOpacity: "0" })
        ),
        React.createElement('linearGradient', {
            id: 'paint3_linear_693_14740',
            x1: '29.001',
            y1: '11.75',
            x2: '29.001',
            y2: '42.945',
            gradientUnits: 'userSpaceOnUse'
          },
          React.createElement('stop', { stopColor: '#BD34FE' }),
          React.createElement('stop', { offset: '1', stopColor: '#AD00FF', stopOpacity: '0.24' })
        ),
        React.createElement('radialGradient', {
            id: "paint4_radial_693_14740",
            cx: "0",
            cy: "0",
            r: "1",
            gradientUnits: "userSpaceOnUse",
            gradientTransform: "translate(39.8002 14.4447) rotate(114.944) scale(28.4542 31.0127)",
          },
          React.createElement("stop", { stopColor: "#FF9CF5" }),
          React.createElement("stop", { offset: "1", stopColor: "#FFBFF9", stopOpacity: "0" })
        ),
        React.createElement('radialGradient', {
            id: "paint5_radial_693_14740",
            cx: "0",
            cy: "0",
            r: "1",
            gradientUnits: "userSpaceOnUse",
            gradientTransform: "translate(12.2002 19.8447) rotate(23.8602) scale(34.1157 37.1833)",
          },
          React.createElement("stop", { stopColor: "white" }),
          React.createElement("stop", { offset: "1", stopColor: "white", stopOpacity: "0" })
        ),
      ),
    );
  }
);

HeartIcon.displayName = 'HeartIcon';

export default HeartIcon;