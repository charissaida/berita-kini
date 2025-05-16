import React from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // first
      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages); // last
    }

    return pages;
  };

  const pages = getPageNumbers();

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </p>

      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={14} /> Previous
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <button
              key={`ellipsis-${i}`}
              className="join-item btn btn-sm btn-disabled"
            >
              ...
            </button>
          ) : (
            <button
              key={p}
              className={`join-item btn btn-sm ${
                p === currentPage ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          className="join-item btn btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default Pagination

