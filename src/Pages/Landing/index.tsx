import { useState } from "react";
import SplineObject from "../../Components/SplineObject";

const LandingPage = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  console.log(splineLoaded);

  const handleSplineLoad = () => {
    setTimeout(() => {
      console.log("Spline loaded");
      setSplineLoaded(true);
    }, 1000);
  };
  return (
    <div>
      <SplineObject
        splineUrl="https://prod.spline.design/efdk1BWvMr0Lhjta/scene.splinecode"
        onLoad={handleSplineLoad}
      />
      {splineLoaded && <h1>Welcome to HEDS</h1>}
    </div>
  );
};

export default LandingPage;
