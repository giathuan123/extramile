import ColorBar from "./ColorBar.tsx";
// Author: Junyuan Guo
// Date Accessed: Nov 26, 2021
// Source: https://github.com/joyjoy993/react-color-bar

function CountiesColorBar() {
  const data = [
    {
      value: 200,
      color: "#E8DAEF",
      tooltip: {
        text: "(1-15,500)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#D2B4DE",
      tooltip: {
        text: "(15,501-31,000)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#BB8FCE",
      tooltip: {
        text: "(31,001-46,500)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#A569BD",
      tooltip: {
        text: "(46,501-62,000)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#8E44AD",
      tooltip: {
        text: "(62,001-77,500)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#7D3C98",
      tooltip: {
        text: "(77,501-93,000)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#6C3483",
      tooltip: {
        text: "(93,001-108,500)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#5B2C6F",
      tooltip: {
        text: "(108,501-124,000)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
    {
      value: 200,
      color: "#4A235A",
      tooltip: {
        text: "(124,001-139,500)",
        props: {
          type: "info",
          place: "top"
        }
      },
    },
  ];

  return (
    <div className="ColorBarContainer">
      <h1>2019 Car Accidents By County</h1>
      <ColorBar data={data} />
    </div>
  );
}

export default CountiesColorBar;
