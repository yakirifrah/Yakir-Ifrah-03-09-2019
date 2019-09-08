import styled from "styled-components";

export const ButtonContainer = styled.button`
  background: transparent;
  font-size: 1em;
  margin: 1em;
  color: var(--lightBlue);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: var(--lightBlue);
    color: var(--mainGreen);
  }
  &:focus {
    outline: none;
  }
`;
