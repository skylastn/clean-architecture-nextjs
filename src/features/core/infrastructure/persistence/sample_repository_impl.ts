import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { SamplePresidentResponse } from "../../domain/model/response/sample/sample_president_response";
import { SampleRepository } from "../../domain/repository/sample_repository";
import { SampleRemoteDataSource } from "../data_source/sample_remote_data_source";
import { SamplePhotoResponse } from "../../domain/model/response/sample/sample_photo_response";

export class SampleRepositoryImpl implements SampleRepository {
  constructor(private readonly remote: SampleRemoteDataSource) {}

  async getListPresident(): Promise<
    Either<ResponseModel, SamplePresidentResponse[]>
  > {
    return await this.remote.getListPresident();
  }

  async getListPhoto(): Promise<Either<ResponseModel, SamplePhotoResponse[]>> {
    return await this.remote.getListPhoto();
  }
}
