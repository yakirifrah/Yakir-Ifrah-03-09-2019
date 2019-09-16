import React, { useEffect, useState } from "react";
import store from "store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";

import Title from "../common/components/Title";
import CardList from "../common/components/CardList";
import { PaginationContainer } from "./components/Pagination";
import Loader from "react-loader-spinner";

import "./style.scss";
export default function Favorite() {
  const [favoriteListRequest, setFavoriteListRequest] = useState({
    loading: false,
    favoriteList: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [favoriteListPerPage, setFavoriteListPerPage] = useState(5);

  useEffect(() => {
    const listFavoriteCities = store.get("favoriteCities");
    const testFavoriteListEmpty = listFavoriteCities => {
      setFavoriteListRequest({ loading: true });
      if (
        (listFavoriteCities !== undefined && Object.getOwnPropertyNames(listFavoriteCities).length === 0) ||
        listFavoriteCities === undefined
      ) {
        setFavoriteListRequest({ loading: false, favoriteList: null });
      } else {
        setFavoriteListRequest({
          loading: false,
          favoriteList: Object.values(listFavoriteCities)
        });
      }
    };
    testFavoriteListEmpty(listFavoriteCities);
  }, []);
  const { loading, favoriteList } = favoriteListRequest;

  const indexOfLastFavoriteList = currentPage * favoriteListPerPage;
  const indexOfFirstFavoriteList = indexOfLastFavoriteList - favoriteListPerPage;

  const currentFavoriteList = favoriteList.slice(indexOfFirstFavoriteList, indexOfLastFavoriteList);

  const handlePaginte = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Row className="text-center mt-3">
        <Col xs={12} md={12} lg={12}>
          <Title name="Favorite" title="cities" />
        </Col>
      </Row>
      {loading ? (
        <>
          <Row className="text-center mt-5">
            <Col xs={12} md={12} lg={12}>
              <Loader type="CradleLoader" color="#00BFFF" height={100} width={100} timeout={3000} />
            </Col>
          </Row>
        </>
      ) : (
        <>
          {favoriteList === null ? (
            <>
              <Row className="text-center mt-5">
                <Col xs={12} md={12} lg={12}>
                  <Title title="empty" />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row className="fav-section justify-content-center">
                <CardDeck className="pt-5 text-center">
                  <CardList data={currentFavoriteList} msg="listFavoriteCities" />
                </CardDeck>
              </Row>

              <footer>
                <PaginationContainer
                  favoriteListPerPage={favoriteListPerPage}
                  totalFavoriteList={favoriteList.length}
                  paginate={handlePaginte}
                />
              </footer>
            </>
          )}
        </>
      )}
    </>
  );
}
