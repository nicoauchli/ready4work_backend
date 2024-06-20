import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeToTodoController } from './employee-to-todo.controller';
import { EmployeeToTodoService } from './employee-to-todo.service';

describe('EmployeeToTodoController', () => {
  let controller: EmployeeToTodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeToTodoController],
      providers: [EmployeeToTodoService],
    }).compile();

    controller = module.get<EmployeeToTodoController>(EmployeeToTodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
