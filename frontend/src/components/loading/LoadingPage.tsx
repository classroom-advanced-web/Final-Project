import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 70) {
          return prevProgress;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setProgress(0);
    };
  }, []);

  return (
    <LoadingBar
      color="#519be0"
      height={3}
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};
export default LoadingPage;
