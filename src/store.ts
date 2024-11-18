import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
    deletedCards: ListItem[];
};

type Actions = {
    deleteCard: (item: ListItem) => void;
};

export const useStore = create<State & Actions>((set) => ({
    deletedCards: [],
    deleteCard: (item) =>
        set((state) => ({
            deletedCards: [...state.deletedCards, item],
        })),
}));
