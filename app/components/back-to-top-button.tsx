import { useCallback } from "react";

type BackToTopButtonProps = {
  visible?: boolean;
  onClick?: () => void;
};

const BackToTopButton = ({ visible = false, onClick }: BackToTopButtonProps) => {
  const handleClick = useCallback(() => {
    onClick?.();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [onClick]);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label="回到頂端"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-black text-xs font-medium uppercase tracking-wide text-white shadow-lg shadow-black/30 transition-opacity duration-200"
    >
      回到頂端
    </button>
  );
};

export default BackToTopButton;

