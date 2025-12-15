import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmployeeEntity } from '../../core/entities/employee.entity';
import {
  EmployeeRepository,
  QueryOptions,
  QueryResponse,
} from '../../core/repositories/employee.repository';
import { EmployeeDto } from './employee.dto';
import { EmployeeMapper } from './employee.mapper';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRepositoryImpl extends EmployeeRepository {
  private readonly apiUrl = environment.apiUrl;
  private readonly http = inject(HttpClient);
  private readonly mapper = inject(EmployeeMapper);

  constructor() {
    super();
  }

  override fetchAll(
    queryOptions?: QueryOptions,
  ): Observable<QueryResponse<EmployeeEntity>> {
    let params = new HttpParams();

    if (queryOptions?.query) {
      Object.entries(queryOptions.query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.append(key, String(value));
        }
      });
    }

    if (queryOptions?.options) {
      const { select, sort, limit, page, offset } = queryOptions.options;

      if (select && select.length > 0) {
        params = params.append('select', select.join(','));
      }

      if (sort) {
        Object.entries(sort).forEach(([key, value]) => {
          params = params.append(`sort[${key}]`, String(value));
        });
      }

      if (limit !== undefined) {
        params = params.append('limit', String(limit));
      }

      if (page !== undefined) {
        params = params.append('page', String(page));
      }

      if (offset !== undefined) {
        params = params.append('offset', String(offset));
      }
    }

    return this.http
      .get<
        QueryResponse<EmployeeDto>
      >('https://mocki.io/v1/1cef3a95-77d7-46a7-9f06-253ad6ad802c', { params })
      .pipe(
        map(response => ({
          ...response,
          data: response.data.map(dto => this.mapper.toEntity(dto)),
        })),
      );
  }

  override fetchOne(employeeId: string): Observable<EmployeeEntity> {
    return this.http
      .get<{
        data: EmployeeDto;
      }>(`https://mocki.io/v1/7fcc7a88-1c49-48fa-bb29-73dfed6f6a60`)
      .pipe(map(({ data }) => this.mapper.toEntity(data)));
  }

  override create(employee: EmployeeEntity): Observable<EmployeeEntity> {
    const dto = this.mapper.toDto(employee);

    return this.http
      .post<EmployeeDto>(this.apiUrl, dto)
      .pipe(map(responseDto => this.mapper.toEntity(responseDto)));
  }
}
