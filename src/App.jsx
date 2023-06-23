import { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { FiDelete } from "react-icons/fi";

import "./App.css";

function App() {
  const [total, setTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState([]);
  const [history, setHistory] = useState("");
  const [done, setDone] = useState(false);
  const clickHandler = (val) => {
    const expressions = ["+", "-", "*", "/", "%", "."];
    const ch = history.charAt(history.length - 1);
    let ch2 = "";
    if (history.length > 1) {
      ch2 = history.charAt(history.length - 2);
    }
    setDone(false);
    try {
      evaluate(history + val);
    } catch (error) {
      if (
        error.message.includes("Value expected") ||
        val === ch ||
        (expressions.includes(ch) && expressions.includes(ch2))
      ) {
        return;
      }
    }

    setHistory(history + val);
  };
  const clearHandler = () => {
    setHistory("");
    setTotal(0);
    setDone(false);
    setPrevTotal([]);
  };
  const backspaceHandler = () => {
    if (history.length <= 0) return;
    setHistory(history.substring(0, history.length - 1));
    setTotal(prevTotal[prevTotal.length - 1]);
  };

  useEffect(() => {
    const expressions = ["+", "-", "*", "/", "%", "."];
    const ch = history.charAt(history.length - 1);

    if (!expressions.includes(ch) && history !== "") {
      const temp = total;
      if (temp.toString().length > 7) {
        setTotal(evaluate(history).toExponential(4));
      } else {
        setTotal(evaluate(history));
      }
      if (total !== prevTotal[prevTotal.length - 1]) {
        setPrevTotal([...prevTotal, total]);
      } else {
        const tempAarr = prevTotal.splice(0, prevTotal.length - 1);
        setPrevTotal(tempAarr);
      }
    } else if (history === "") setTotal(0);
  }, [history]);
  return (
    <div className="container">
      <h1>Ease Your Calculations</h1>
      <div className="calc-body">
        <div className="calc-screen">
          <div className="calc-operation">{history}</div>
          <div className={done ? "calc-typed done" : "calc-typed"}>
            {total}
            <span className="blink-me">|</span>
          </div>
        </div>
        <div className="calc-button-row">
          <div className="button c" onClick={clearHandler}>
            C
          </div>
          <div
            className="button l"
            onClick={() => {
              clickHandler("^2");
            }}
          >
            x<sup>2</sup>
          </div>
          <div className="button l" onClick={() => clickHandler("%")}>
            %
          </div>
          <div className="button l" onClick={() => clickHandler("/")}>
            /
          </div>
        </div>
        <div className="calc-button-row">
          <div
            className="button"
            onClick={() => {
              clickHandler("7");
            }}
          >
            7
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("8");
            }}
          >
            8
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("9");
            }}
          >
            9
          </div>
          <div className="button l" onClick={() => clickHandler("*")}>
            x
          </div>
        </div>
        <div className="calc-button-row">
          <div
            className="button"
            onClick={() => {
              clickHandler("4");
            }}
          >
            4
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("5");
            }}
          >
            5
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("6");
            }}
          >
            6
          </div>
          <div className="button l" onClick={() => clickHandler("-")}>
            −
          </div>
        </div>
        <div className="calc-button-row">
          <div
            className="button"
            onClick={() => {
              clickHandler("1");
            }}
          >
            1
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("2");
            }}
          >
            2
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("3");
            }}
          >
            3
          </div>
          <div className="button l" onClick={() => clickHandler("+")}>
            +
          </div>
        </div>
        <div className="calc-button-row">
          <div
            className="button"
            onClick={() => {
              clickHandler(".");
            }}
          >
            .
          </div>
          <div
            className="button"
            onClick={() => {
              clickHandler("0");
            }}
          >
            0
          </div>
          <div className="button" onClick={backspaceHandler}>
            <FiDelete />
          </div>
          <div
            className="button l"
            onClick={() => {
              setHistory(total.toString());
              setDone(true);
            }}
          >
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
