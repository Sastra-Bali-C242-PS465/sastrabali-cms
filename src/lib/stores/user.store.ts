import Group from '@/interfaces/group.interface';
import { User } from '@/interfaces/user.interface';
import { create } from 'zustand';

interface UserState {
  users: User[];
  setUsers: (groups: User[]) => void;
}

const useUserStore = create<UserState>()((set) => ({
  users: [],
  setUsers: (users) => set({ users: users }),
}));

export default useUserStore;
