import { fireEvent, render } from "@testing-library/react";
import { ModalProvider } from "./";
import { MockComponentWith2Modals, MockComponentWithModal } from "./__tests__/mocks";

const renderWithProvider = (component: JSX.Element) => {
  return render(<ModalProvider>{component}</ModalProvider>);
};

describe("Modal state provider", () => {
  it("Should render modal component", () => {
    const { getByText, getByTestId } = renderWithProvider(<MockComponentWithModal />);
    const openModalButton = getByTestId("open-modal");

    fireEvent(
      openModalButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByText("First modal component")).toBeInTheDocument();
  });

  it("Should render 2 modals", () => {
    const { getByText, getByTestId } = renderWithProvider(<MockComponentWith2Modals />);
    const openModal1Button = getByTestId("open-modal1");
    const openModal2Button = getByTestId("open-modal2");

    fireEvent(
      openModal1Button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByText("First modal component")).toBeInTheDocument();

    fireEvent(
      openModal2Button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByText("Second modal component")).toBeInTheDocument();
  });

  it("Should correctly close last opened modal", () => {
    const { getByText, getByTestId, queryByText } = renderWithProvider(
      <MockComponentWith2Modals />
    );
    const openModal1Button = getByTestId("open-modal1");
    const closeModal1Button = getByTestId("close-modal1");
    const openModal2Button = getByTestId("open-modal2");
    const closeModal2Button = getByTestId("close-modal2");

    fireEvent(
      openModal1Button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    fireEvent(
      openModal2Button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByText("First modal component")).toBeInTheDocument();
    expect(getByText("Second modal component")).toBeInTheDocument();

    fireEvent(
      closeModal2Button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(getByText("First modal component")).toBeInTheDocument();
    expect(queryByText("Second modal component")).not.toBeInTheDocument();

    fireEvent(
      closeModal1Button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(queryByText("First modal component")).not.toBeInTheDocument();
  });
});
