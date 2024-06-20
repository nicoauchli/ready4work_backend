import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeToTodoService } from './employee-to-todo.service';

describe('EmployeeToTodoService', () => {
  let service: EmployeeToTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeToTodoService],
    }).compile();

    service = module.get<EmployeeToTodoService>(EmployeeToTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
