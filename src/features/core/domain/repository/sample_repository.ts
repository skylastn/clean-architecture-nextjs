import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { SamplePresidentResponse } from "../model/response/sample/sample_president_response";
import { SamplePhotoResponse } from "../model/response/sample/sample_photo_response";

export interface SampleRepository {
  getListPresident(): Promise<Either<ResponseModel, SamplePresidentResponse[]>>;
  getListPhoto(): Promise<Either<ResponseModel, SamplePhotoResponse[]>>;
}
