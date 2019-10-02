import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import { useSelector, useDispatch } from "react-redux";
import { requestAutocompleteCities, setLocationCityKey } from "../../../../store/action";
import _ from "lodash";

import store from "store";
import styled from "styled-components";

export default function SearchBar() {
	const storeRedux = useSelector(state => state);
	const favoriteCities = store.get("favoriteCities");
	const { autoCompleteCities, detailCitiesSearch, currentCity, loadingAutoComplete } = storeRedux;

	const dispatch = useDispatch();
	const handleSearch = _.debounce(async query => {
		if (query.length >= 1) {
			await dispatch(requestAutocompleteCities(query));
		}
	}, 200);

	const handleChange = _.debounce(async selectedOptions => {
		const selectedCity = selectedOptions[0];
		if (selectedCity) {
			await dispatch(setLocationCityKey(selectedCity, currentCity, detailCitiesSearch, favoriteCities));
		}
	}, 0);

	return (
		<Styles>
			<InputGroup>
				<InputGroup.Prepend>
					<InputGroup.Text id="basic-addon1">
						<FontAwesomeIcon icon={faSearch} />
					</InputGroup.Text>
				</InputGroup.Prepend>
				<AsyncTypeahead
					isLoading={loadingAutoComplete}
					minLength={1}
					id="search"
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
	a {
		color: black !important;
	}
`;
