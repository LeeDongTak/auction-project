import { ModalType, openCustomModal } from "../redux/modules/customModalSlice";
import store, { useAppDispatch } from "../redux/config/configStore";

export const useCustomModal = () => {
  const dispatch = useAppDispatch();

  const handleOpenCustomModal = (message: string, modalType: ModalType) => {
    return new Promise((resolve) => {
      dispatch(openCustomModal({ message, modalType }));

      const unsubscribe = store.subscribe(() => {
        const modalState = store.getState().customModal;
        if (!modalState.isOpen) {
          resolve(modalState.result);
          unsubscribe();
        }
      });
    });
  };

  return { handleOpenCustomModal };
};
