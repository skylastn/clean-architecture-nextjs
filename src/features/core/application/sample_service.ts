import { ResponseModel } from "@/shared/domain/model/response_model";
import { Either } from "@/shared/utils/utility/either";
import { SamplePresidentResponse } from "../domain/model/response/sample/sample_president_response";
import { SampleRepository } from "../domain/repository/sample_repository";
import { SampleRemoteDataSource } from "../infrastructure/data_source/sample_remote_data_source";
import { SampleRepositoryImpl } from "../infrastructure/persistence/sample_repository_impl";
import { SamplePhotoResponse } from "../domain/model/response/sample/sample_photo_response";

export class SampleService {
  private repo: SampleRepository;
  constructor() {
    this.repo = new SampleRepositoryImpl(new SampleRemoteDataSource());
  }

  async getListPresident(): Promise<
    Either<ResponseModel, SamplePresidentResponse[]>
  > {
    return await this.repo.getListPresident();
  }

  async getListPhoto(): Promise<Either<ResponseModel, SamplePhotoResponse[]>> {
    return await this.repo.getListPhoto();
  }
}
