declare module "@readr-media/share-button" {
  import type { FC, MouseEventHandler } from "react";

  export interface ShareButtonProps {
    pathColor?: string;
    direction?: "vertical" | "horizon";
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    FbClick?: MouseEventHandler<HTMLButtonElement>;
    LineClick?: MouseEventHandler<HTMLButtonElement>;
    LinkClick?: MouseEventHandler<HTMLButtonElement>;
  }

  export const ShareButton: FC<ShareButtonProps>;
}
