const updateSearchParams = (key: string, value: string) => {
  const newParams = new URLSearchParams(window.location.search);

  // Add or update a search parameter
  newParams.set(key, value);

  // Navigate to the new URL with updated search parameters. It gets the job done.
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${newParams.toString()}`
  );
};

export default updateSearchParams;
