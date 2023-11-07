export const PaginationStateWithQuery = (objectQuery:any, searchField?:any, query?:any) => {
    if (searchField && query) return new URLSearchParams({ ...objectQuery, [searchField]: query }).toString().replace('%2C', ',');
    return new URLSearchParams({ ...objectQuery }).toString().replace('%2C', ',');
  };