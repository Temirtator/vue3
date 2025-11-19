import { defineStore } from "pinia";
import { fetchUsers, updateUser } from "../services/users";
import type { User } from "../types/User";

const LS_KEY = "users_cache_v1";

export const useUsersStore = defineStore("users", {
  state: () => ({
    list: [] as User[],
    loading: false,
    saving: false,
    error: null as string | null,
    search: "",
  }),

  getters: {
    filtered(state) {
      const q = state.search.toLowerCase();
      const filteredList = state.list.filter(
        u =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
      return filteredList; 
    },
    getById: (state) => (id: number) => state.list.find(u => u.id === id) ?? null,
  },

  actions: {
    async load(updateList?: boolean) {
      try {
        this.loading = true;
        this.error = null;

        const cached = localStorage.getItem(LS_KEY);

        if (cached && !updateList) {
          this.list = JSON.parse(cached) as User[];
        } else {
          this.list = await fetchUsers();
          localStorage.setItem(LS_KEY, JSON.stringify(this.list));
        }
      } catch (e) {
        this.error = "Failed to load users";
      } finally {
        this.loading = false;
      }
    },

    async saveUser(id: number, data: Partial<User>) {
      try {
        this.saving = true;
        this.error = null;

        let result: User | null = null;
        try {
          result = await updateUser(id, data);
        } catch (apiErr) {
          console.warn("API update failed, will update local only", apiErr);
        }

        const idx = this.list.findIndex(u => u.id === id);
        if (idx !== -1) {
          const updated = result ?? { ...this.list[idx], ...data } as User;
          updated.id = Number(updated.id);
          this.list.splice(idx, 1, updated);
        } else if (result) {
          this.list.push(result);
        } else {
          const newLocal = { id, ...(data as object) } as User;
          this.list.push(newLocal);
        }

        localStorage.setItem(LS_KEY, JSON.stringify(this.list));

        return result ?? this.list.find(u => u.id === id) ?? null;
      } catch (e) {
        this.error = "Failed to save user";
        throw e;
      } finally {
        this.saving = false;
      }
    },
  },
});
