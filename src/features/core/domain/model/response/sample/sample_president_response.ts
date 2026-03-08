// export type SamplePresidentResponseWrapper = BaseResponse<SamplePresidentResponse>;
// export type SamplePresidentResponseListWrapper = BaseResponse<SamplePresidentResponse[]>;

import { ConvertResponse } from "@/shared/domain/model/response/convert_response";

export class SamplePresidentResponse {
  id?: number;
  ordinal?: number;
  name?: string;
  yearsInOffice?: string;
  vicePresidents?: string[];
  photo?: string;

  constructor(data?: SamplePresidentResponse) {
    this.id = data?.id;
    this.ordinal = data?.ordinal;
    this.name = data?.name;
    this.yearsInOffice = data?.yearsInOffice;
    this.vicePresidents = data?.vicePresidents;
    this.photo = data?.photo;
  }

  static Convert = ConvertResponse<SamplePresidentResponse>();
  static ConvertList = ConvertResponse<SamplePresidentResponse[]>();
}
