import { create } from "zustand";
import { CustomEdgesTypes } from "@/app/types/structs";

interface ICustomEdge {
  error: string | null;
  currentType: string;
  setError: (error: string | null) => void;
  onChangeType: (type: string) => void;
  analytics: boolean;
  setAnalytics: (isShow: boolean) => void;
}

export const useChangeEdgeType = create<ICustomEdge>((set) => ({
  error: null,
  analytics: false,
  setAnalytics: (isShow: boolean) =>
    set({
      analytics: isShow,
    }),
  currentType: "Default",
  setError: (error: string | null) =>
    set({
      error: error,
    }),
  onChangeType: (type: string) =>
    set({
      currentType: type,
    }),
}));
