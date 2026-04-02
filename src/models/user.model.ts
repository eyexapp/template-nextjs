/**
 * Example domain entity — replace with your own models.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  name: string;
}

export interface UpdateUserInput {
  name?: string;
  avatarUrl?: string;
}
