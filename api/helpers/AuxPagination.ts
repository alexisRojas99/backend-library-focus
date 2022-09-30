const setPagination = (page: number = 1, perPage: number = 10) => {
  const offset = (Number(page) - 1) * Number(perPage);
  return {
    offset,
    limit: Number(perPage),
    distinct: true,
  };
};

export default setPagination;
