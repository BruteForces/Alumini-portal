import React from "react";

const Loader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        backgroundImage: "none",
        display: "block",
        shapeRendering: "crispedges",
      }}
      width="50px"
      height="50px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx={84} cy={50} r={10} fill="#6af5f8">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.5s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="2s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#6af5f8;#54b6ed;#6af5f8"
          begin="0s"
        />
      </circle>
      <circle cx={16} cy={50} r={10} fill="#6af5f8">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
      </circle>
      <circle cx={50} cy={50} r={10} fill="#54b6ed">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.5s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.5s"
        />
      </circle>
      <circle cx={84} cy={50} r={10} fill="#6af5f8">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1s"
        />
      </circle>
      <circle cx={16} cy={50} r={10} fill="#54b6ed">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.5s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="2s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.5s"
        />
      </circle>
    </svg>
  );
};

export default Loader;
