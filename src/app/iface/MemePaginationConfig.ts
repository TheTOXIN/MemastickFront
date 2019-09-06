import {UUID} from 'angular2-uuid';
import {MemeFilter} from '../consts/MemeFilter';

export interface MemePaginationConfig {
  page: number;
  size: number;
  sort: string;
  filter: MemeFilter;
  reverse?: boolean;
  step?: number;
  memetick?: UUID;
}
