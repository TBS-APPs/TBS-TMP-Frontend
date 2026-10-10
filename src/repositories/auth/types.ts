export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  status: UserStatus;
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  BLOCKED = "blocked",
}
