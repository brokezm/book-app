import { useEffect, useState } from "react";
import { useDebounce } from "../common/useDebounce";

type Book = {
  title: string;
  author_name: string;
  type: string;
};

// function useDebounce(value: unknown, when = 500) {
//   const [debouncedValue, setDebouncedValue] = useState<unknown>(value);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedValue(value);
//     }, when);

//     return () => clearTimeout(timeout);
//   }, [when, value]);

//   return debouncedValue || "";
// }

function RootPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");

  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    fetch(
      "https://openlibrary.org/search.json?" +
        new URLSearchParams({
          q: debouncedQuery as string,
        })
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs);
      })
      .catch((e) => console.error(e));
  }, [debouncedQuery]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {books &&
        books.map((book, i) => (
          <h4 key={i}>
            {book.author_name} - {book.title}
          </h4>
        ))}
    </>
  );
}

export default RootPage;
