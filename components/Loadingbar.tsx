// LoadingBar.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
      <LoadingBar
        color="#0000ff" // Set the color to blue
        progress={progress}
        onLoaderFinished={() => {}} // You can add a callback if needed
      />
    );
  };
  

const LoadingBarComponent = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const simulateProgress = () => {
      

      // Simulate additional progress at 50%
      setTimeout(() => {
        setProgress(70);
      }, 1000);

      // Simulate additional progress at 100%
      setTimeout(() => {
        setProgress(100);
      }, 2000);
    };

    simulateProgress();
  }, [router.pathname]); // Update progress when route changes

  return <ProgressBar progress={progress} />;
};

export default LoadingBarComponent;
