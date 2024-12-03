import Group from '@/interfaces/group.interface';
import { create } from 'zustand';

interface GroupState {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
}

const useGroupStore = create<GroupState>()((set) => ({
  groups: [],
  setGroups: (groups) => set({ groups: groups }),
}));

export default useGroupStore;
