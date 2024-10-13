import React, { useEffect, useState } from "react";

const Belajar = (props) => {
  const [scrollBody, setScrollBody] = useState(window.scroll);

  const updateScrollPosition = () => {
    console.log(window.scrollY);
    setScrollBody(window.scrollY);
  };

  useEffect(() => {
    console.log("Attaching");
    window.addEventListener("scroll", updateScrollPosition);
    return () => {
      console.log("Deteching");
      window.removeEventListener("scroll", updateScrollPosition);
    };
  });

  return (
    <div style={{ height: "3000px", backgroundColor: "gray" }}>Belajar</div>
  );
};

export default Belajar;
