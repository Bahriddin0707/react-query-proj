import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "./Planet";
import PaginationControls from "./PaginationControls ";

const fetchPlanets = async (url) => {
  const res = await fetch(url || `https://swapi.dev/api/planets/`);
  return res.json();
};

const Planets = () => {
  const [pageUrl, setPageUrl] = useState("https://swapi.dev/api/planets/");

  const {
    data: planets,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["planets", pageUrl],
    queryFn: () => fetchPlanets(pageUrl),
    keepPreviousData: true,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Failed to fetch</div>;
  }

  console.log(planets);

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

  return (
    <div>
      <PaginationControls
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
        hasNext={!!planets?.next}
        hasPrevious={!!planets?.previous}
      />

      <div>
        {planets.results.map((planet) => {
          return <Planet planet={planet} key={planet.name} />;
        })}
      </div>
    </div>
  );
};

export default Planets;
