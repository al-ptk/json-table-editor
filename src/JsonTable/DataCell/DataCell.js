import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDataCell } from '../../redux/slices/tableSlice';
import { StyledDataCell } from './DataCell.styles';
import ExpandedCellModal from '../../modals/ExpandedCellModal';
import { setModal } from '../../redux/slices/uiKnobsSlice';
import Tooltip from '../../components/Tooltip';
import { language } from '../../locales/language';

export const DataCell = ({ accessCoordinates, className }) => {
  const [cellValue, handleInput] = useCellAccessor(accessCoordinates);
  const isVertical = useSelector((state) => state.uiKnobs.isVertical);
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState(null);

  return (
    <StyledDataCell.Container
      className={className}
      isVertical={isVertical}
      onDoubleClick={() =>
        dispatch(
          setModal({ modal: <ExpandedCellModal {...{ accessCoordinates }} /> })
        )
      }
    >
      <StyledDataCell.Textarea
        value={cellValue || ''}
        onInput={handleInput}
        onMouseOver={(e) => {
          // if(tipHasBeenGiven('textarea-overflow')) return;

          const coords = e.target.parentNode.getBoundingClientRect();
          const elem = e.target;
          if (elem.clientHeight < elem.scrollHeight) {
            setTooltip(
              <Tooltip xPos={coords.left} yPos={coords.top - 24}>
                {language['tooltipExpandCell']}
              </Tooltip>
            );
          }
        }}
        onMouseLeave={() => setTooltip(null)}
      />
      {tooltip}
    </StyledDataCell.Container>
  );
};

export function useCellAccessor({ instanceIndex, propertyIndex }) {
  const table = useSelector((state) => state.table.instances);
  const schema = useSelector((state) => state.table.schema);
  const dispatch = useDispatch();

  const propertyName = schema[propertyIndex].name;
  const cellValue = table[instanceIndex][propertyName];

  const handleInput = (e) => {
    dispatch(
      updateDataCell({ instanceIndex, propertyName, data: e.target.value })
    );
  };

  return [cellValue, handleInput];
}
