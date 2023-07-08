import { EmptyObject } from "@/types/common";
import { useCallback, useContext, useMemo } from "react";
import { ModalContext } from "./context";

export const useModal = <Props,>(Component: React.FC<Props>) => {
  const { addModal, removeModal } = useContext(ModalContext);

  const show = useCallback(
    (...[props]: Props extends EmptyObject ? [unknown?] : [Props]) => {
      const key = crypto.randomUUID();
      const component = <Component {...(props as Props)} key={key} />;
      addModal(component);
    },
    [Component, addModal]
  );

  const hide = useCallback(() => {
    removeModal();
  }, [removeModal]);

  return useMemo(() => ({ show, hide }), [hide, show]);
};
