import styled from 'styled-components';

export const DropDownAnchor = {
  Container: styled.div``,
  Button: styled.button`
    padding: 5px;
    background-color: transparent;
    color: white;
    border: none;
    font-weight: bold;
  `,
};

export const DropDown = {
  Container: styled.div`
    position: fixed;
    top: ${(props) => props.yPos};
    left: ${(props) => props.xPos};
    z-index: 10;
    width: fit-content;
    background-color: #373737;
    border: 1px solid white;
    padding: 2px 0px;
  `,
  Button: styled.button`
    display: block;
    background-color: transparent;
    color: white;
    border: none;
    width: 100%;
    text-align: left;
    padding: 1px 10px;
    font-size: 16px;
  `,
  HozRuler: styled.hr``,
};