"use client";

import styles from "./toolbar.module.css";

export default function Toolbar({
  title,
  searchTerm = "",
  enableSearch = true,
}) {
  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-grey font-bold">{title}</h1>
        {enableSearch && (
          <div>
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={() => console.log("search")}
              className={styles.searchInput}
            />
          </div>
        )}
      </div>
    </section>
  );
}
