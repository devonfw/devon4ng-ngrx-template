import { SampleDataModel } from './sampledata.model';
import { Pageable } from '../../shared/models/pageable';

/* @export
 * @interface HttpResponseModel
 */
export interface HttpResponseModel {
  content: SampleDataModel[];
  pageable?: Pageable;
  totalElements: number;
}
