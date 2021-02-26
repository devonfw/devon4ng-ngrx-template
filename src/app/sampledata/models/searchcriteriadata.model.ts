import { SampleDataModel } from './sampledata.model';

/* @export
 * @interface SearchCriteriaDataModel
 */
export interface SearchCriteriaDataModel {
  criteria: Record<string, unknown>;
  data: SampleDataModel;
}
