import React from 'react';
import styled from 'styled-components';

const Button = styled.a`
  text-decoration: none;
  display: inline-flex;
  color: #ffffff;
  background-color: #ff439f;
  border-radius: 3px;
  border: 1px solid transparent;
  padding: 0.3rem 0.5rem 0.3rem 0.3rem;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  transition: 0.1s all linear;
  font-family: cursive;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
    opacity: 0.85;
    color: #ffffff;
  }
`;

const Image = styled.img`
  height: 25px;
  width: 26px;
  margin-top: 1px;
  box-shadow: none;
  border: none;
  vertical-align: middle;
`;

const Text = styled.span`
  margin-left: 6px;
  font-size: 1.2rem;
  vertical-align: middle;
`;

function Coffee() {
  return (
    <Button target="_blank" href="https://www.buymeacoffee.com/randomizer">
      <Image
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
      />
      <Text>Buy me a coffee</Text>
    </Button>
  );
}

export default Coffee;
