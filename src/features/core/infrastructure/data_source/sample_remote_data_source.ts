import { ResponseModel } from "@/shared/domain/model/response_model";
import { ApiClient } from "@/shared/network/api_client";
import { Either, left, right } from "@/shared/utils/utility/either";
import { SamplePresidentResponse } from "../../domain/model/response/sample/sample_president_response";
import { UrlPath } from "@/shared/constant/url_path";
import { HttpMethod } from "@/shared/domain/model/enum/http_method";
import { SamplePhotoResponse } from "../../domain/model/response/sample/sample_photo_response";

export class SampleRemoteDataSource {
  constructor(
    private apiSamples = new ApiClient("https://api.sampleapis.com"),
    private apiJsonPlaceHolder = new ApiClient(
      "https://picsum.photos",
    ),
  ) {}

  async getListPresident(): Promise<
    Either<ResponseModel, SamplePresidentResponse[]>
  > {
    try {
      const response = await this.apiSamples.request({
        path: `${UrlPath.SAMPLE_PRESIDENT}/presidents`,
        method: HttpMethod.GET,
      });
      if (response.status == false) {
        return left(response);
      }
      return right(
        SamplePresidentResponse.ConvertList.fromJson(
          JSON.stringify(response.data),
        ),
      );
    } catch (error) {
      return left(ResponseModel.fromError(error));
    }
  }
  async getListPhoto(): Promise<Either<ResponseModel, SamplePhotoResponse[]>> {
    try {
      const response = await this.apiJsonPlaceHolder.request({
        path: `${UrlPath.SAMPLE_PHOTO}`,
        method: HttpMethod.GET,
      });
      if (response.status == false) {
        return left(response);
      }
      return right(
        SamplePhotoResponse.ConvertList.fromJson(JSON.stringify(response.data)),
      );
    } catch (error) {
      return left(ResponseModel.fromError(error));
    }
  }
}
