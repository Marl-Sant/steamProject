import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import "./HtmlToText.css";

const HtmlToText = (htmlString) => {
  //   const [formatted, setFormatted] = useState("");

  //   useEffect(() => {
  //     const temp = document.createElement("div");
  //     temp.innerHTML = htmlString.props;

  //     let text = temp.innerHTML
  //       //   .replace(/<\/h[1-6]>/g, "\n\n")
  //       .replace(/<\/p>/g, "\n\n")
  //       //   .replace(/<br\s*\/?>/g, "\n")
  //       .replace(/<[^>]+>/g, "");

  //     setFormatted(text.trim());
  //   }, [htmlString]);

  //   return (
  //     <div className="long-description">
  //       <div style={{ whiteSpace: "pre-wrap" }}>{formatted}</div>
  //     </div>
  //   );
  return <div className="long-description">{parse(htmlString.props)}</div>;
};

export default HtmlToText;
