import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";

import "./styles.css";

function App() {
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeout = useRef<null | NodeJS.Timeout>(null);

  const inputClasses = useMemo(() => {
    return [
      "form__input",
      isAnimating ? " form__input--shake" : "",
      isInvalid ? " form__input--error" : "",
    ].join(" ");
  }, [isAnimating, isInvalid]);

  const handleChange = (value: string) => {
    setIsInvalid(false);
    setValue(value);
  };
  const handleSubmit = () => {
    const parsedValue = Number(value);
    if (value !== "" && Number.isInteger(parsedValue)) {
      alert(parsedValue);
    } else {
      setIsInvalid(true);
      setIsAnimating(true);

      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setIsAnimating(false);
      }, 450);
    }
  };

  return (
    <div className="form">
      <h1>What's the magic password ? :)</h1>
      <input
        placeholder="Enter some text"
        className={inputClasses}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="form__submit" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
