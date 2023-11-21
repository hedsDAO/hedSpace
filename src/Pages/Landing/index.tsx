import { useState, useRef } from "react";
import SplineObject from "../../Components/SplineObject";

const LandingPage = () => {
  const obj = useRef();
  const [splineLoaded, setSplineLoaded] = useState(false);
  console.log(splineLoaded);

  const handleSplineLoad = (spline: any) => {
    obj.current = spline.findObjectById('4bcbf609-baa1-41fe-be6e-a688a9266522');


    setTimeout(() => {
        console.log(obj.current)
      console.log("Spline loaded");
      setSplineLoaded(true);
    }, 1000);
  };
  return (
    <>
      <SplineObject
        splineUrl="https://prod.spline.design/6O8A9d3yUvB0o6dE/scene.splinecode"
        onLoad={handleSplineLoad}
        // onMouseHover={() => console.log("Hovered")}
      />
    </>
  );
};

export default LandingPage;
