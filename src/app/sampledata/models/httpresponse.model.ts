import { SampledataModel } from './sampledata.model';

/* @export
 * @interface HttpResponseModel
 */
export interface HttpResponseModel {
  content: SampledataModel[];
  totalElements: number;
}
