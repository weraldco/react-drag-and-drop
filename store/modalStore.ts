import { create } from 'zustand';

export type ModalStoreT = {
	isModalOpen: boolean;
	activeColumnId: string;
	openModal: (columnId: string) => void;
	closeModal: () => void;
};
export const useModalStore = create<ModalStoreT>((set) => ({
	isModalOpen: false,
	activeColumnId: '',
	openModal: (columnId: string) =>
		set({ isModalOpen: true, activeColumnId: columnId }),
	closeModal: () => set({ isModalOpen: false, activeColumnId: '' }),
}));
