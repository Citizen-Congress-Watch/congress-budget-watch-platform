interface VisualizationSkeletonProps {
  isDesktop: boolean;
}

const DesktopSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 w-1/3 rounded bg-gray-200" />
    <div className="mt-4 flex space-x-4">
      <div className="h-10 w-48 rounded bg-gray-200" />
      <div className="h-10 w-48 rounded bg-gray-200" />
    </div>
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="h-24 rounded bg-gray-200" />
      <div className="h-24 rounded bg-gray-200" />
      <div className="h-24 rounded bg-gray-200" />
    </div>
    <div className="mt-6 h-96 w-full rounded bg-gray-200" />
  </div>
);

const MobileSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 w-1/2 rounded bg-gray-200" />
    <div className="mt-4 space-y-3">
      <div className="h-10 w-full rounded bg-gray-200" />
      <div className="h-10 w-full rounded bg-gray-200" />
    </div>
    <div className="mt-6 space-y-4">
      <div className="h-20 rounded bg-gray-200" />
      <div className="h-20 rounded bg-gray-200" />
      <div className="h-20 rounded bg-gray-200" />
    </div>
    <div className="mt-6 h-64 w-full rounded bg-gray-200" />
  </div>
);

const VisualizationSkeleton = ({ isDesktop }: VisualizationSkeletonProps) => {
  return isDesktop ? <DesktopSkeleton /> : <MobileSkeleton />;
};

export default VisualizationSkeleton;
