export interface SignInRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  phoneNumber : string;
}

export interface AuthResponse {
  token: string;
  message: string;
}
