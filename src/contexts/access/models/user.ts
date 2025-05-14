export interface UserSignUp {
  email: string;
  password: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name?: string;
  phone?: string;
  age?: number;
  photoUrl?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
//   user: User;
}