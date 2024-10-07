"use client";
import { useRouter } from "next/navigation";
/**
 * BlogPagination Component
 *
 * This component renders a pagination control for blog posts.
 * It displays numbered buttons for each page and Previous/Next buttons when applicable.
 *
 * Key features:
 * - Displays a button for each page number.
 * - Shows a 'Previous' button if not on the first page.
 * - Shows a 'Next' button if not on the last page.
 * - Highlights the current page button.
 * - Handles navigation between pages, including a special case for the first page.
 *
 * @param props.currentPage The current active page number.
 * @param props.totalPages The total number of pages available.
 *
 * Navigation behavior:
 * - Clicking on page 1 navigates to the root URL ('/').
 * - Clicking on any other page navigates to '/blogs/[page]'.
 *
 * This component uses the Next.js router for navigation, ensuring smooth transitions
 * between pages without full page reloads.
 */
interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}
export const BlogPagination = ({
  currentPage,
  totalPages,
}: BlogPaginationProps) => {
  const router = useRouter();
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page === 1) {
      // Redirect to root for first page
      router.push("/");
    } else {
      // Navigate to specific blog page
      router.push(`/blog/page/${page}`);
    }
  };

  return (
    <div className="mt-8 flex justify-center space-x-2">
      {/* Previous page button */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="rounded border px-4 py-2"
        >
          Previous
        </button>
      )}
      {/* Page number buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`rounded border px-4 py-2 ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
        >
          {page}
        </button>
      ))}
      {/* Next page button */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="rounded border px-4 py-2"
        >
          Next
        </button>
      )}
    </div>
  );
};
