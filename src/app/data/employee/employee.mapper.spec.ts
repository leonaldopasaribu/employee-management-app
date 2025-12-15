import { describe, it, expect, beforeEach } from 'vitest';
import { EmployeeEntity } from '../../core/entities/employee.entity';
import { EmployeeDto } from './employee.dto';
import { EmployeeMapper } from './employee.mapper';

describe('EmployeeMapper', () => {
  let mapper: EmployeeMapper;

  beforeEach(() => {
    mapper = new EmployeeMapper();
  });

  it('should map entity to dto when toDto is called', () => {
    const entity: EmployeeEntity = {
      id: '123',
      username: 'john.doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: new Date('1990-01-01'),
      basicSalary: 5_000_000,
      status: 'active',
      group: 'engineering',
      description: 'Software Engineer',
    };

    const result = mapper.toDto(entity);

    expect(result).toEqual({
      id: '123',
      username: 'john.doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: new Date('1990-01-01'),
      basicSalary: 5_000_000,
      status: 'active',
      group: 'engineering',
      description: 'Software Engineer',
    });
  });

  it('should map dto to entity when toEntity is called', () => {
    const dto: EmployeeDto = {
      id: '456',
      username: 'jane.smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      birthDate: new Date('1995-05-15'),
      basicSalary: 6_000_000,
      status: 'active',
      group: 'marketing',
      description: 'Marketing Manager',
    };

    const result = mapper.toEntity(dto);

    expect(result).toEqual({
      id: '456',
      username: 'jane.smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      birthDate: new Date('1995-05-15'),
      basicSalary: 6_000_000,
      status: 'active',
      group: 'marketing',
      description: 'Marketing Manager',
    });
  });
});
