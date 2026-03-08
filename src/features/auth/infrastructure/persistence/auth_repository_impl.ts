import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { LoginRequest } from "../../domain/model/request/login_request";
import { LoginResponse } from "../../domain/model/response/login_response";
import { AuthRepository } from "../../domain/repository/auth_repository";
import { AuthLocalDataSource } from "../data_source/local/auth_local_data_source";
import { AuthRemoteDataSource } from "../data_source/remote/auth_remote_data_source";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly local: AuthLocalDataSource,
    private readonly remote: AuthRemoteDataSource,
  ) {}

  get isLogin(): boolean {
    return this.local.isLogin;
  }
  async login(
    request: LoginRequest,
  ): Promise<Either<ResponseModel, LoginResponse>> {
    return await this.remote.login(request);
  }
  async loginWithPhone(phone: string): Promise<Either<ResponseModel, boolean>> {
    return await this.remote.loginWithPhone(phone);
  }
  async logout(): Promise<Either<string, boolean>> {
    return await this.remote.logout();
  }

  saveIsDarkMode(value: boolean): void {
    return this.local.saveIsDarkMode(value);
  }

  get isDarkMode(): boolean {
    return this.local.isDarkMode;
  }
}
