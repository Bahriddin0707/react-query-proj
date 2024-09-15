export function getPageFromUrl(url, data) {
  const currentPage = url.match(/page=(\d+)/)
    ? parseInt(url.match(/page=(\d+)/)[1], 10)
    : 1;
  const totalPages = data?.count
    ? Math.ceil(data.count / (data.results?.length || 1))
    : 0; // Fallback to 1 to avoid division by zero
  return { currentPage, totalPages };
}
