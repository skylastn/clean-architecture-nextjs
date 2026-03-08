import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export class SamplePhotoResponse {
  id?: number;
  author?: string;
  url?: string;
  download_url?: string;

  constructor(data?: SamplePhotoResponse) {
    this.id = data?.id;
    this.author = data?.author;
    this.url = data?.url;
    this.download_url = data?.download_url;
  }

  static Convert = ConvertResponse<SamplePhotoResponse>();
  static ConvertList = ConvertResponse<SamplePhotoResponse[]>();
}
