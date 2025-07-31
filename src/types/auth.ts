export interface User {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
}
