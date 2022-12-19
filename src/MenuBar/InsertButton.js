import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInstance, addProperty } from '../app/slices/tableSlice';
import { ContextMenu, ContextMenuButton } from '../components/ContextMenu';

export const InsertButton = () => {
  const [dropdown, setDropdown] = useState(null);
  const Reference = useRef(null);

  return (
    <div>
      <button
        onClick={(e) => {
          const coords = e.target.getBoundingClientRect();
          const xPos = coords.left;
          const yPos = coords.bottom;
          setDropdown(
            <InsertDropdown
              {...{ xPos, yPos, Reference }}
              closeMenu={() => setDropdown(null)}
            />
          );
        }}
      >
        Insert
      </button>
      {dropdown}
    </div>
  );
};

function InsertDropdown({ xPos, yPos, Reference, closeMenu }) {
  const dispatch = useDispatch();
  return (
    <ContextMenu {...{ xPos, yPos, Reference, closeMenu }}>
      <ContextMenuButton
        buttonText={'Add new property'}
        buttonAction={() => dispatch(addProperty({}))}
        closeMenu={closeMenu}
      />
      <ContextMenuButton
        buttonText={'Add new instance'}
        buttonAction={() => dispatch(addInstance({}))}
        closeMenu={closeMenu}
      />
    </ContextMenu>
  );
}
