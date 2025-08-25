import { useEffect, useState } from "react";
import './Decoder.css'

function Decoder({ message, speed = 50 }) {
  const [display, setDisplay] = useState(Array(message.length).fill(""));

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, i) => {
          if (i < index) {
            return message[i];
          }
          return Math.random() > 0.5 ? "0" : "1";
        })
      );

      index++;
      if (index > message.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [message, speed]);

  return (
    <div className="page-wrapper">
      <p className='decoding-style'>
        {display.join("")}
      </p>
    </div>
  );
}

export default Decoder;
