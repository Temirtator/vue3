import api from "./api";
import type { User } from "../types/User";

export const fetchUsers = () =>
  api.get<User[]>("/users").then(r => r.data);

export const updateUser = (id: number, data: Partial<User>) =>
  api.put(`/users/${id}`, data).then(r => r.data);
