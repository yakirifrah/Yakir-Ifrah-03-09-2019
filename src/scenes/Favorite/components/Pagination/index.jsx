import React from "react";
import Pagination from "react-bootstrap/Pagination";
export const PaginationContainer = ({
  favoriteListPerPage,
  totalFavoriteList,
  paginate
}) => {
  const pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(totalFavoriteList / favoriteListPerPage);
    number++
  ) {
    pageNumbers.push(
      <Pagination.Item
        onClick={() => {
          paginate(number);
        }}
        key={number}
      >
        {number}
      </Pagination.Item>
    );
  }
  const pagination = (
    <>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        {pageNumbers}
      </Pagination>
    </>
  );

  return <>{pagination}</>;
};
