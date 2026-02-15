import React, { useEffect } from 'react';

import { SkeletonLoader } from 'lib/components';

import DocTitle from '../DocTitle';

const SkeletonLoaderDocs: React.FC = () => {
  useEffect(() => {
    console.log('SkeletonLoaderDocs mounted!');
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <DocTitle name="SkeletonLoader" />

      <div className="p-16 bg-white rounded-[40px] flex-col justify-start items-start gap-4 inline-flex">
        {/* Default Skeleton */}
        <div className="grid grid-cols-3 gap-4 p-4 relative rounded-[5px] border border-primary-600">
          <SkeletonLoader />
          <SkeletonLoader width="w-32" />
          <SkeletonLoader height="h-6" width="w-20" />
        </div>

        {/* Rounded Variants */}
        <div className="grid grid-cols-3 gap-4 p-4 relative rounded-[5px] border border-primary-600">
          <SkeletonLoader height="h-20" rounded="rounded-full" width="w-20" />
          <SkeletonLoader height="h-6" rounded="rounded-lg" width="w-32" />
          <SkeletonLoader height="h-3" rounded="rounded-sm" width="w-48" />
        </div>

        {/* Animated & Non-Animated */}
        <div className="grid grid-cols-3 gap-4 p-4 relative rounded-[5px] border border-primary-600">
          <SkeletonLoader animated height="h-4" width="w-40" />
          <SkeletonLoader animated={false} height="h-4" width="w-40" />
          <SkeletonLoader animated height="h-10" width="w-20" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoaderDocs;
