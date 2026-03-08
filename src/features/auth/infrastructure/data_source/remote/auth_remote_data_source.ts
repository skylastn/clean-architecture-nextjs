import { UrlPath } from "@/shared/constant/url_path";
import { ApiClient } from "@/shared/network/api_client";
import { AuthLocalDataSource } from "../local/auth_local_data_source";
import { LoginRequest } from "@/features/auth/domain/model/request/login_request";
import { Either, left, right } from "@/shared/utils/utility/either";
import { ResponseModel } from "@/shared/domain/model/response_model";
import { HttpMethod } from "@/shared/domain/model/enum/http_method";
import { LoginResponse } from "@/features/auth/domain/model/response/login_response";

export class AuthRemoteDataSource {
  constructor(
    private local = new AuthLocalDataSource(),
    private api = new ApiClient(),
  ) {}

  async login(
    request: LoginRequest,
  ): Promise<Either<ResponseModel, LoginResponse>> {
    try {
      const response = await this.api.request({
        path: UrlPath.LOGIN,
        method: HttpMethod.POST,
        data: request,
      });
      if (response.status == false) {
        return left(response);
      }
      const result = LoginResponse.Convert.fromJson(JSON.stringify(response));
      if (result.status) {
        await this.local.login(result.data?.access_token ?? "");
        // this.local.saveUser(result.data?.user ?? null);
      }
      return right(result.data!);
    } catch (error) {
      return left(ResponseModel.fromError(error));
    }
  }

  async loginWithPhone(phone: string): Promise<Either<ResponseModel, boolean>> {
    try {
      const response = await this.api.request({
        path: UrlPath.LOGIN_WITH_PHONE,
        method: HttpMethod.POST,
        data: {
          phone: phone,
        },
      });
      if (response.status == false) {
        return left(response);
      }
      return right(true);
    } catch (error) {
      return left(ResponseModel.fromError(error));
    }
  }

  async logout(): Promise<Either<string, boolean>> {
    try {
      // await this.api.request({
      //   path: UrlPath.LOGOUT,
      //   method: HttpMethod.POST,
      // });
      this.local.logout();
      return right(true);
    } catch (error) {
      return left(error instanceof Error ? error.message : String(error));
    }
  }
}
