import { Pageable } from './pageable';

/* @export
 * @interface SearchCriteria
 */
export interface SearchCriteria {
  [propName: string]: any;
  pageable: Pageable;
}
