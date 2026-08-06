import { useEffect, useState } from "react";
import Image from "~/components/image";

const IMAGE_BATCH_SIZE = 10;

type ProposalImageGalleryProps = {
  imageUrls: string[];
};

const ProposalImageGallery = ({ imageUrls }: ProposalImageGalleryProps) => {
  const [visibleCount, setVisibleCount] = useState(IMAGE_BATCH_SIZE);
  const imageSetKey = imageUrls.join("\n");
  const visibleImages = imageUrls.slice(0, visibleCount);
  const remainingCount = imageUrls.length - visibleImages.length;
  const nextBatchSize = Math.min(IMAGE_BATCH_SIZE, remainingCount);

  useEffect(() => {
    setVisibleCount(IMAGE_BATCH_SIZE);
  }, [imageSetKey]);

  if (imageUrls.length === 0) return null;

  return (
    <section aria-labelledby="proposal-images-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="proposal-images-heading"
          className="bg-brand-accent w-fit rounded-t-lg border-2 border-black px-2.5 py-1 text-base font-normal text-white"
        >
          提案單圖檔
        </h2>
        <p className="text-sm text-neutral-500">共 {imageUrls.length} 張</p>
      </div>
      <div className="grid grid-cols-1 gap-4 border-t border-black pt-4 lg:grid-cols-2 lg:gap-6">
        {visibleImages.map((imageUrl, index) => (
          <a
            key={`${imageUrl}-${index}`}
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            aria-label={`開啟第 ${index + 1} 張提案單圖檔原圖`}
          >
            <span className="absolute top-2 left-2 z-10 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
              第 {index + 1} 張
            </span>
            <Image
              src={imageUrl}
              alt={`提案單圖檔第 ${index + 1} 張，共 ${imageUrls.length} 張`}
              loading="lazy"
              decoding="async"
              className="aspect-3/4 w-full bg-white object-contain transition-transform duration-200 group-hover:scale-[1.01]"
            />
          </a>
        ))}
      </div>
      <div className="mt-5 flex flex-col items-center gap-3">
        <p className="text-sm text-neutral-500" aria-live="polite">
          已顯示 {visibleImages.length} / {imageUrls.length} 張
        </p>
        {remainingCount > 0 && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + IMAGE_BATCH_SIZE)}
            className="border-brand-primary text-brand-primary hover:bg-brand-primary focus-visible:outline-brand-primary min-h-11 w-full rounded-lg border-2 px-6 py-2.5 font-bold transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
          >
            再顯示 {nextBatchSize} 張
          </button>
        )}
      </div>
    </section>
  );
};

export default ProposalImageGallery;
