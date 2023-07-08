import { useModal } from "../useModal";

const Modal1 = () => <div>First modal component</div>;
const Modal2 = () => <div>Second modal component</div>;

export const MockComponentWith2Modals = () => {
  const { show: showModal1, hide: hideModal1 } = useModal(Modal1);
  const { show: showModal2, hide: hideModal2 } = useModal(Modal2);

  return (
    <>
      <button onClick={showModal1} data-testid="open-modal1">
        Open modal1
      </button>
      <button onClick={hideModal1} data-testid="close-modal1">
        Close modal1
      </button>
      <button onClick={showModal2} data-testid="open-modal2">
        Open modal2
      </button>
      <button onClick={hideModal2} data-testid="close-modal2">
        Close modal2
      </button>
    </>
  );
};

export const MockComponentWithModal = () => {
  const { show } = useModal(Modal1);

  return (
    <button onClick={show} data-testid="open-modal">
      Open modal
    </button>
  );
};
