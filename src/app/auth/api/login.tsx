import axios from "@/api/axiosInstance";
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  route: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export const loginUser = async (
    data: LoginRequest
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
      "https://api.triverse.live/v1/auth/login",
      data
  );
  return response.data;
};
