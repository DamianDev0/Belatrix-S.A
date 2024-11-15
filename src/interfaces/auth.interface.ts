export interface ApiResponse {
  statusCode: number;
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}

export interface RegisterResponse {
  statusCode: number;
  message: string;
  data: {
    email: string;
    id: number;
  };
}

export interface User {
  email: string;
  id: number;
}
