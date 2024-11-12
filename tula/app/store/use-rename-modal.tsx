import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IRenameModal {
  isVisibleEditor: boolean;
  isVisibleBoard: boolean;
  isOpen: boolean;
  initialValues: typeof defaultValues;
  setIsVisisble: () => void;
  setIsVisisbleBoard: () => void;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isVisibleEditor: false,
  isVisibleBoard: false,
  isOpen: false,
  setIsVisisble: () => {
    set((state) => ({
      isVisibleEditor: !state.isVisibleEditor,
    }));
  },
  setIsVisisbleBoard: () => {
    set((state) => ({
      isVisibleBoard: !state.isVisibleBoard,
    }));
  },
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
