import React from 'react';
import {
  StyledMain,
  StyledTable,
  StyledJsonFormatter,
} from './SchemaTable.styled';
import { swapPropertyName, range, objectify } from '../utils/helperFunctions';
import { HeadingCell } from './HeadingCell';
import { DataCell } from './DataCell';

export function SchemaTable({
  tableData,
  setTableData,
  headingOrder,
  setHeadingOrder,
  rowNumber,
  showPreview,
}) {
  const headingUpdateFactory = (index) => {
    return (newHeading) => {
      let oldHeading = headingOrder[index];
      if (oldHeading === newHeading) return;

      // updates the headingOrder
      const newOrder = headingOrder.slice(); // creates shallow copy
      newOrder[index] = newHeading;
      setHeadingOrder(newOrder);

      // updates ALL tableData entries
      const newTableData = tableData.map((object) => {
        object[newHeading] = object[oldHeading];
        delete object[oldHeading];
        return object;
      });
      setTableData(newTableData);
    };
  };

  const headingReadFactory = (index) => {
    return () => headingOrder[index];
  };

  const dataUpdateFactory = (index, property) => {
    return (newValue) => {
      const newTable = tableData.slice(); // creates shallow copy
      newTable[index][property] = newValue;
      setTableData(newTable);
    };
  };

  const dataReadFactory = (index, property) => {
    return () => tableData[index][property];
  };

  return (
    <StyledMain>
      <StyledTable>
        <TableHead
          {...{ headingOrder, headingReadFactory, headingUpdateFactory }}
        />
        <TableBody
          {...{ rowNumber, headingOrder, dataReadFactory, dataUpdateFactory }}
        />
      </StyledTable>
      <JSONPreview {...{ showPreview, tableData, rowNumber, headingOrder }} />
    </StyledMain>
  );
}

function TableHead({ headingOrder, headingReadFactory, headingUpdateFactory }) {
  return (
    <thead style={{ position: 'sticky', top: 50 }}>
      <tr>
        {headingOrder.map((heading, headingIndex) => (
          <HeadingCell
            readValue={headingReadFactory(headingIndex)}
            updateValue={headingUpdateFactory(headingIndex)}
            key={headingIndex}
          />
        ))}
      </tr>
    </thead>
  );
}

function TableBody({
  rowNumber,
  headingOrder,
  dataReadFactory,
  dataUpdateFactory,
}) {
  return (
    <tbody>
      {range(rowNumber).map((rowIndex) => (
        <tr key={rowIndex}>
          {headingOrder.map((heading, cellIndex) => {
            return (
              <DataCell
                readValue={dataReadFactory(rowIndex, heading)}
                updateValue={dataUpdateFactory(rowIndex, heading)}
                key={cellIndex}
              />
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

function JSONPreview({ showPreview, tableData, rowNumber, headingOrder }) {
  return (
    showPreview && (
      <p
        style={{
          backgroundColor: 'white',
          width: 400,
          margin: '0 auto',
          padding: 10,
        }}
      >
        <StyledJsonFormatter
          json={JSON.stringify(objectify(tableData, rowNumber, headingOrder))}
          tabWith={4}
        />
      </p>
    )
  );
}