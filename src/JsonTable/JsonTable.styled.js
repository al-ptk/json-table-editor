import styled from 'styled-components';
import JsonFormatter from 'react-json-formatter';

export const StyledMain = styled.main`
  margin: 10vh auto;
  padding: 100px;

  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const StyledTable = styled.table`
  width: 80%;
  margin: 0 auto;

  background-color: white;
  border-collapse: collapse;

  td,
  th {
    border: 1px solid rgba(0, 0, 0, 0.5);
  }

  :focus,
  :focus-within {
    box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.7);
  }
`;

export const StyledJsonFormatter = styled(JsonFormatter)``;