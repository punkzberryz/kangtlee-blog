"use client";
import { ReactNode, useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import katex from "katex";

interface ContentWithLatexProps {
  children: ReactNode;
}

/**
 * ContentWithLatex Component
 *
 * This component enhances its children by rendering LaTeX equations found within the content.
 * It works as follows:
 * 1. The component's children are rendered normally (potentially server-side).
 * 2. On the client side, it searches for <span latex="..."> elements within its children.
 * 3. It replaces these spans with rendered LaTeX equations using the LatexRenderer component.
 *
 * This approach allows for server-side rendering of the main content while still
 * providing client-side enhancement for LaTeX equations.
 *
 * @param {ReactNode} children - The content to be wrapped and enhanced with LaTeX rendering.
 */

export const ContentWithLatex = ({ children }: ContentWithLatexProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const roots: Root[] = [];

    if (currentContainer) {
      // Find all spans with a 'latex' attribute
      const latexSpans = currentContainer.querySelectorAll("span[latex]");
      latexSpans.forEach((span) => {
        const latex = span.getAttribute("latex");
        if (latex) {
          // Create a new React root for each LaTeX span and render the LatexRenderer
          const root = createRoot(span);
          root.render(<LatexRenderer latex={latex} />);
          roots.push(root);
        }
      });
    }

    // Cleanup function to unmount all created React roots when the component unmounts
    return () => {
      roots.forEach((root) => root.unmount());
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return <div ref={containerRef}>{children}</div>;
};
/**
 * LatexRenderer Component
 *
 * This component renders a single LaTeX equation using the KaTeX library.
 * It's used internally by ContentWithLatex to render each LaTeX equation found in the content.
 *
 * @param {string} latex - The LaTeX string to be rendered.
 */
const LatexRenderer = ({ latex }: { latex: string }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      // Use KaTeX to render the LaTeX string into the span
      katex.render(latex, spanRef.current, {
        throwOnError: false, // Prevents KaTeX from throwing errors for invalid LaTeX
        displayMode: false, // Renders the equation inline (as opposed to a block)
      });
    }
  }, [latex]); // Re-render if the latex prop changes

  return <span ref={spanRef} />;
};
