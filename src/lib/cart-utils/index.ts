import { MakeColorVariant } from "../types/types";

type GetImageThumbnailProps = Omit<MakeColorVariant, "colors">;

function getImageThumbnail(
  { images }: GetImageThumbnailProps,
  color: string | null,
) {
  if (color) {
    const image = images.find(
      (image) =>
        image.imagePublicId.includes(color) &&
        image.imagePublicId.endsWith("-thumb"),
    );
    return image?.imagePublicId;
  }
  return images.find((image) => image.imagePublicId.endsWith("-thumb"))
    ?.imagePublicId;
}

function makeUrl(slug: string, pid: string, color: string | null | undefined) {
  if (color) {
    return (
      `/store/${slug}?pid=${pid}` +
      "&" +
      new URLSearchParams({ color: color.toLowerCase() })
    );
  }
  return `/store/${slug}?pid=${pid}`;
}

export { getImageThumbnail, makeUrl };
