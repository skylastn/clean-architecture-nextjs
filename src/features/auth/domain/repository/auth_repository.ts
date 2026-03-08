import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { LoginRequest } from "../model/request/login_request";
import { LoginResponse } from "../model/response/login_response";

export interface AuthRepository {
  get isLogin(): boolean;
  login(request: LoginRequest): Promise<Either<ResponseModel, LoginResponse>>;
  loginWithPhone(phone: string): Promise<Either<ResponseModel, boolean>>;
  logout(): Promise<Either<string, boolean>>;
  saveIsDarkMode(value: boolean): void;
  get isDarkMode(): boolean;
}
