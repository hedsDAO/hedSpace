// import React, { Suspense } from "react";
// const Spline = React.lazy(() => import("@splinetool/react-spline"));
import Spline from "@splinetool/react-spline";

const SplineObject = ({
  splineUrl,
  onLoad,
}: {
  splineUrl: string;
  onLoad?: (param: any) => void;
}) => {
  function onMouseHover(e: any) {
    console.log(e);
    if (e.target.name === "Digital_Clock") {
      console.log("I have been clicked!");
    }
  }
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div className="wrapper">
      <Spline scene={splineUrl} onLoad={onLoad} onMouseDown={onMouseHover} />
    </div>
    // </Suspense>
  );
};

export default SplineObject;
