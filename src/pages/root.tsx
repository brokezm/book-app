import { useEffect, useState, useCallback, ChangeEventHandler } from "react";

import { useDebounce } from "../common/useDebounce";
import { Book } from "../types/Book";

function RootPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query);

  const queryChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  useEffect(() => {
    async function findBooks() {
      try {
        const response = await fetch(
          "https://openlibrary.org/search.json?" +
            new URLSearchParams({
              q: debouncedQuery as string,
            })
        );
        const data = await response.json();
        setBooks(data.docs);
      } catch (e) {
        console.error(e);
      }
    }

    findBooks();
  }, [debouncedQuery]);

  return (
    <>
      <input type="text" value={query} onChange={queryChange} />
      {books &&
        books.map((book, i) => (
          <h4 key={i}>
            {book.author_name?.join(", ")} - {book.title} (
            {book.first_publish_year}). ISBN:
            {book.isbn ? book.isbn.slice(0, 1) : "Not provided"}
          </h4>
        ))}
    </>
  );
}

export default RootPage;
