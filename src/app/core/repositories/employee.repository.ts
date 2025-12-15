import { Observable } from 'rxjs';
import { EmployeeEntity } from '../entities/employee.entity';

export abstract class EmployeeRepository {
  abstract fetchAll(
    queryOptions?: QueryOptions,
  ): Observable<QueryResponse<EmployeeEntity>>;
  abstract fetchOne(id: string): Observable<EmployeeEntity>;
  abstract create(employee: EmployeeEntity): Observable<EmployeeEntity>;
}

export interface QueryOptions {
  query?: Record<string, any>;
  options?: {
    select?: string[];
    sort?: Record<string, number>;
    limit?: number;
    page?: number;
    offset?: number;
  };
}

export interface QueryResponse<T> {
  data: T[];
  totalData: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}
