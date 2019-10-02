import styled from "styled-components";

export const ButtonContainer = styled.button`
	background: transparent;
	font-size: 1em;
	margin: ${props => (props.paddingStyle ? "" : "1em")};
	color: ${props => (props.night ? "var(--light)" : "var(--blue)")};
	border-radius: ${props => (props.paddingStyle ? "25%" : "1em")};
	cursor: pointer;
	padding: ${props => (props.paddingStyle ? "1em" : "")};
	transition: all 0.5s ease-in-out;
	&:hover {
		background: ${props => (props.night ? "var(--light)" : "var(--light)")};
		color: ${props => (props.night ? "var(--blue)" : "var(--blue)")};
	}
	&:focus {
		outline: none;
	}
`;
