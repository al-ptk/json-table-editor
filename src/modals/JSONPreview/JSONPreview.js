import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/slices/uiKnobsSlice';
import { Modal } from '../Modal.styles';
import JsonFormatter from 'react-json-formatter';
import styled from 'styled-components';
import { LanguageContext } from '../../App';

export function JSONPreview() {
  const dispatch = useDispatch();
  const language = useContext(LanguageContext);

  return createPortal(
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.CloseButton
          onClick={() => dispatch(setModal({}))}
          aria-label={language['closeModal']}
        >
          <Modal.CloseIcon />
        </Modal.CloseButton>
        <StyledFormatter />
      </Modal.Container>
    </Modal.Backdrop>,
    document.querySelector('#modal-portal')
  );
}

const StyledFormatter = () => {
  const instances = useSelector((state) => state.table.instances);
  const title = useSelector((state) => state.table.title);
  const schema = useSelector(state => state.table.schema)
  return (
    <Div
      style={{
        backgroundColor: '#303030',
        padding: 20,
        width: '100%',
        height: '400px',
        overflowY: 'scroll',
      }}
    >
      <JsonFormatter
        json={JSON.stringify({title, schema, instances})}
        tabWith={4}
        style={{ backgroundColor: '#303030' }}
      />
    </Div>
  );
};

const Div = styled.div`
  background-color: #303030;
  padding: 20px;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
`;
