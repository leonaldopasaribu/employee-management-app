import { EmployeeEntity } from '../../core/entities/employee.entity';
import { DtoMapper, EntityMapper } from '../../shared/base';
import { EmployeeDto } from './employee.dto';

export class EmployeeMapper
  implements
    DtoMapper<EmployeeDto, EmployeeEntity>,
    EntityMapper<EmployeeDto, EmployeeEntity>
{
  toDto(entity: EmployeeEntity): EmployeeDto {
    return {
      id: entity.id,
      username: entity.username,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      birthDate: entity.birthDate,
      basicSalary: entity.basicSalary,
      status: entity.status,
      group: entity.group,
      description: entity.description,
    };
  }

  toEntity(dto: EmployeeDto): EmployeeEntity {
    return {
      id: dto.id,
      username: dto.username,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      birthDate: dto.birthDate,
      basicSalary: dto.basicSalary,
      status: dto.status,
      group: dto.group,
      description: dto.description,
    };
  }
}
