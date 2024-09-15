import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Person from "./Person";
import PaginationControls from "./PaginationControls ";

const fetchPeople = async (url) => {
  const res = await fetch(url || "http://swapi.dev/api/people/");
  return res.json();
};

const People = () => {
  let [pageUrl, setPageUrl] = useState("http://swapi.dev/api/people/");

  const {
    data: people,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["people", pageUrl],
    queryFn: () => {
      return fetchPeople(pageUrl);
    },
    keepPreviousData: true,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Failed to fetch</div>;
  }

  // Handler for Next Page button
  const handleNextPage = () => {
    if (people.next) {
      setPageUrl(people.next);
    }
  };

  // Handler for Previous Page button
  const handlePreviousPage = () => {
    if (people.previous) {
      setPageUrl(people.previous);
    }
  };

  return (
    <div>
      <PaginationControls
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
        hasNext={!!people?.next}
        hasPrevious={!!people?.previous}
      />

      <div>
        {people.results.map((person) => {
          return <Person person={person} key={person.name} />;
        })}
      </div>
    </div>
  );
};

export default People;
