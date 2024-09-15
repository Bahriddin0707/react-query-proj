import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "./Planet";
import PaginationControls from "./PaginationControls ";
import { getPageFromUrl } from "../utils/getPageFromUrl";

const fetchPeople = async (url) => {
  const res = await fetch(url || "http://swapi.dev/api/planets/");
  return res.json();
};

const People = () => {
  let [pageUrl, setPageUrl] = useState("http://swapi.dev/api/planets/");

  const {
    data: planets,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["planets", pageUrl],
    queryFn: () => {
      return fetchPeople(pageUrl);
    },
    keepPreviousData: true,
    staleTime: 0,
    cacheTime: 10,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Failed to fetch</div>;
  }

  const { currentPage, totalPages } = getPageFromUrl(pageUrl, planets);

  // Handler for Next Page button
  const handleNextPage = () => {
    if (planets.next) {
      setPageUrl(planets.next);
    }
  };

  // Handler for Previous Page button
  const handlePreviousPage = () => {
    if (planets.previous) {
      setPageUrl(planets.previous);
    }
  };

  console.log(planets);
  return (
    <div>
      <PaginationControls
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
        hasNext={!!planets?.next}
        hasPrevious={!!planets?.previous}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <div>
        {planets.results.map((planet) => {
          return <Planet planet={planet} key={planet.name} />;
        })}
      </div>
    </div>
  );
};

export default People;
