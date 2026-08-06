import { GQL_ENDPOINTS } from "~/constants/endpoints";

const THUMBNAIL_SOURCE_HOST = "lydata.ronny-s3.click";
const THUMBNAIL_ENDPOINT = GQL_ENDPOINTS.replace(
  /\/api\/graphql\/?$/,
  "/api/proposal-image-thumbnail"
);

type ProposalImageSources = {
  src: string;
  srcSet?: string;
};

function getCanonicalThumbnailSource(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    if (url.protocol !== "https:" || url.hostname !== THUMBNAIL_SOURCE_HOST) {
      return null;
    }

    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function buildThumbnailUrl(sourceUrl: string, width: 640 | 1200): string {
  const searchParams = new URLSearchParams({
    url: sourceUrl,
    width: String(width),
  });

  return `${THUMBNAIL_ENDPOINT}?${searchParams.toString()}`;
}

export function getProposalImageSources(
  imageUrl: string
): ProposalImageSources {
  const sourceUrl = getCanonicalThumbnailSource(imageUrl);
  if (!sourceUrl || THUMBNAIL_ENDPOINT === GQL_ENDPOINTS) {
    return { src: imageUrl };
  }

  const smallThumbnailUrl = buildThumbnailUrl(sourceUrl, 640);
  const largeThumbnailUrl = buildThumbnailUrl(sourceUrl, 1200);

  return {
    src: largeThumbnailUrl,
    srcSet: `${smallThumbnailUrl} 640w, ${largeThumbnailUrl} 1200w`,
  };
}
