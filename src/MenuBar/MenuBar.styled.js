import styled from 'styled-components';

export const StyledMenuBar = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 3em;
  z-index: 10;
  isolation: isolate;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;
  padding: 0px 15px;

  background-color: #373737;
  color: white;

  hr {
    color: rgba(255, 255, 255, 0.3);
    margin: 2px 0;
  }
`;

export const StyledAnchorContainer = styled.div`
  a,
  button {
    padding: 5px;
    background-color: transparent;
    color: white;
    border: none;
    font-weight: bold;
    text-decoration: none;
  }

   > a,
   > div > button {
    font-size: 18px;
  }

`