import React from "react";
import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <Bars
      color="#222831"
      height={150}
      width={180}
      ariaLabel="loading-indicator"
    />
  );
}

export default Loader;
