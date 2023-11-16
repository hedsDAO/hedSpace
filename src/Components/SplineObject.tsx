import Spline from '@splinetool/react-spline';

const SplineObject = ({ splineUrl, onLoad }: { splineUrl: string, onLoad: () => void }) => {
  return <Spline scene={splineUrl} onLoad={onLoad} />;
};

export default SplineObject;
