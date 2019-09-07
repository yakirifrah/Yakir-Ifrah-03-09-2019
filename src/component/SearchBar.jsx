import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useSelector, useDispatch } from "react-redux";
import { requestAutocompleteCities, setLocationCityKey } from "../store/action";

import styled from "styled-components";

export default function SearchBar() {
  const autoCompleteCities = useSelector(state => state.autoCompleteCities);
  const isLoading = useSelector(state => state.loading);
  const detailCitiesSerach = useSelector(state => state.detailCitiesSerach);
  const currentCity = useSelector(state => state.currentCity);
  const favoriteCities = useSelector(state => state.favoriteCities);
  const dispatch = useDispatch();
  const handleSearch = query => {
    if (query.length === 2) {
      dispatch(requestAutocompleteCities(query));
    }
  };

  const handleChange = selectedOptions => {
    const selectedCity = selectedOptions[0];
    if (selectedCity)
      dispatch(
        setLocationCityKey(
          selectedCity,
          currentCity,
          detailCitiesSerach,
          favoriteCities
        )
      );
  };

  return (
    <Styles>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <AsyncTypeahead
          id="search"
          isLoading={isLoading}
          bsSize="large"
          placeholder="search ..."
          labelKey="search"
          onSearch={query => {
            handleSearch(query);
          }}
          onChange={handleChange}
          options={autoCompleteCities}
        />
      </InputGroup>
    </Styles>
  );
}

const Styles = styled.div`
  .input-group.md-form.form-sm.form-1 input {
    border: 1px solid #bdbdbd;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  .input-group-prepend {
    margin-left: -3.9rem;
  }
  .form-check-input {
    position: absolute;
    margin-top: 0.3rem;
    margin-left: -1.25rem;
    width: -webkit-fill-available;
  }
  .input-group-text {
    background-color: #ecf0f1;
    &:hover {
      cursor: pointer;
    }
  }
  path {
    color: #1abc9c;
  }
`;
