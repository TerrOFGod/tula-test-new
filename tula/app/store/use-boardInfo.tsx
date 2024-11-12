import { create } from "zustand";

interface IGenerateStore {
  description: string;
  setDescription: (text: string) => void;
}

export const useGenerate = create<IGenerateStore>((set) => ({
  description: "Тестовая доска для показа",
  setDescription: (text) => {
    set({
      description: text,
    });
  },
}));

//   isVisibleEditor: false,
//   isVisibleBoard: false,
//   isOpen: false,
//   setIsVisisble: () => {
//     set((state) => ({
//       isVisibleEditor: !state.isVisibleEditor,
//     }));
//   },
//   setIsVisisbleBoard: () => {
//     set((state) => ({
//       isVisibleBoard: !state.isVisibleBoard,
//     }));
//   },
//   onOpen: (id, title) =>
//     set({
//       isOpen: true,
//       initialValues: { id, title },
//     }),
//   onClose: () =>
//     set({
//       isOpen: false,
//       initialValues: defaultValues,
//     }),
//   initialValues: defaultValues,
