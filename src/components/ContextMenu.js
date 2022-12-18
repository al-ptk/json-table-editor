import styled from 'styled-components';

/*
  ContextMenu and ContextMenuButton are to belonog in a local context provider.
  Use them by composition, like this:

    function foo ({xPos, yPos, setContextVisibility}) {
      const ref = useRef(null);
      const closeContextMenu = () => {ref.current.remove()}/

      <div> // Any wrapper should do
        <ContextMenu 
        ref={ref}
          xPos={some_number} 
          yPos={some_number}
        >
          <ContextMenu 
            buttonText={someText}
            buttonAction={someFunction}
            closeContextMenu={setContextVisibility}
          />
        </ContextMenu>
      </div>
    }
*/

export function ContextMenu({
  children,
  Reference,
  xPos,
  yPos,
  closeContextMenu,
}) {
  return (
    <StyledMenu
      ref={Reference}
      xPos={!isNaN(xPos) ? `${xPos}px` : 'inherit'}
      yPos={!isNaN(yPos) ? `${yPos}px` : 'inherit'}
      tabIndex={0}
      onBlur={(e) => {
        e.preventDefault();
        const isFocusWithin = Reference.current.contains(
          document.activeElement
        );
        console.log(e.target);
        if (!isFocusWithin) {
          closeContextMenu();
        }
        return;
      }}
    >
      {children}
    </StyledMenu>
  );
}

export const ContextMenuButton = ({
  buttonText,
  buttonAction,
  closeContextMenu,
}) => {
  return (
    <button
      onClick={() => {
        buttonAction();
        closeContextMenu();
      }}
    >
      {buttonText}
    </button>
  );
};

const StyledMenu = styled.div`
  position: fixed;
  top: ${(props) => props.yPos};
  left: ${(props) => props.xPos};
  z-index: 10;
  width: 200px;
  background-color: #373737;
  border: 1px solid white;

  button {
    display: block;
    background-color: transparent;
    color: white;
    border: none;
    width: 100%;
  }
`;
