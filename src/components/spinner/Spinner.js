const Spinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{
        background: "none",
        display: "block",
        width: "100%",
      }}
      height="250"
    >
      <g>
        <path
          stroke="none"
          fill="#ff1020"
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
        >
          <animateTransform
            values="0 50 51;360 50 51"
            keyTimes="0;1"
            repeatCount="indefinite"
            dur="1s"
            type="rotate"
            attributeName="transform"
          />
        </path>
        <g />
      </g>
    </svg>
  );
};

export default Spinner;
