import React, { useState } from "react";

export function Table({ columns, data }) {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const filtered = data.filter((row) =>
    columns.some((col) =>
      String(row[col.accessor]).toLowerCase().includes(filter.toLowerCase())
    )
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="flex items-center mb-2 gap-2">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border px-2 py-1 rounded"
          value={perPage}
          onChange={(e) => {
            setPerPage(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>
      <table className="w-full border rounded overflow-hidden">
        <thead>
          <tr className="bg-[var(--accent)] text-white">
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-2 text-left">{col.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row, i) => (
            <tr key={i} className="even:bg-[var(--cardBackground)] odd:bg-white dark:odd:bg-zinc-900">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-2 border-t">{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-2">
        <span>
          Page {page} of {totalPages}
        </span>
        <div>
          <button
            className="px-2 py-1 border rounded mr-2"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            className="px-2 py-1 border rounded"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}