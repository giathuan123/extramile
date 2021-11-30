import ColorBar from "./ColorBar.tsx";
import './colorBarStyles.css';

// Author: Junyuan Guo
// Date Accessed: Nov 26, 2021
// Source: https://github.com/joyjoy993/react-color-bar

function CountiesColorBar() {
  const data = [
    {
      value: 200,
      color: "#ffedea",
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
      color: "#ffcec5",
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
      color: "#ffad9f",
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
      color: "#ff8a75",
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
      color: "#ff5533",
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
      color: "#e2492d",
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
      color: "#be3d26",
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
      color: "#9a311f",
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
      color: "#782618",
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
      <h1>2016-2020 Accidents By County</h1>
      <ColorBar data={data} />
    </div>
  );
}

export default CountiesColorBar;
