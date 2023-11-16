import React, { Suspense } from "react";
const Spline = React.lazy(() => import("@splinetool/react-spline"));

const SplineObject = ({
  splineUrl,
  onLoad,
}: {
  splineUrl: string;
  onLoad: () => void;
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Spline scene={splineUrl} onLoad={onLoad} />;
    </Suspense>
  );
};

export default SplineObject;
