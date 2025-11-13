import { useEffect, useRef } from "react";

type EmbedCodeBlockProps = {
  html: string;
  className?: string;
};

export function EmbedCodeBlock({ html, className }: EmbedCodeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.innerHTML = html;

    const scriptTags = Array.from(container.querySelectorAll("script"));
    scriptTags.forEach((originalScript) => {
      const executableScript = document.createElement("script");
      Array.from(originalScript.attributes).forEach((attr) => {
        executableScript.setAttribute(attr.name, attr.value);
      });
      executableScript.textContent = originalScript.textContent;
      originalScript.parentNode?.replaceChild(executableScript, originalScript);
    });

    return () => {
      container.innerHTML = "";
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
