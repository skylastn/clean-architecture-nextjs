import { BaseModelResponse } from "@/shared/domain/model/response/base_model_response";
import { BaseResponse } from "@/shared/domain/model/response/base_response";
import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export type LoginResponseWrapper = BaseResponse<LoginResponse>;
export type LoginResponseListWrapper = BaseResponse<LoginResponse[]>;

export class LoginResponse extends BaseModelResponse {
  access_token?: string;

  constructor(access_token?: string) {
    super();
    this.access_token = access_token;
  }

  static Convert = ConvertResponse<LoginResponseWrapper>();
  static ConvertList = ConvertResponse<LoginResponseListWrapper>();
}
