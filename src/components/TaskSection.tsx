import React from 'react';
import { Task, Employee, EmployeeData } from '../types';
import EmployeeRow from './EmployeeRow';

interface Props {
  task: Task;
  taskIndex: number;
  phaseIndex: number;
  handleTaskChange: (phaseIndex: number, taskIndex: number, field: keyof Task, value: any) => void;
  addEmployee: (phaseIndex: number, taskIndex: number) => void;
  employeeNames: EmployeeData[];
  isFirstTask: boolean;
  canRemove: boolean;
  removeTask: (phaseIndex: number, taskIndex: number) => void;
}

const TaskSection: React.FC<Props> = ({
  task,
  taskIndex,
  phaseIndex,
  handleTaskChange,
  addEmployee,
  employeeNames,
  isFirstTask,
  canRemove,
  removeTask
}) => {
  const handleEmployeeChange = (employeeIndex: number, updatedEmployee: Employee) => {
    const updatedEmployees = task.employees.map((emp, idx) => 
      idx === employeeIndex ? updatedEmployee : emp
    );
    
    handleTaskChange(phaseIndex, taskIndex, 'employees', updatedEmployees);
  };
  
  return (
    <div className="mt-4 mb-6 ml-6 p-4 bg-white rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            value={task.name}
            onChange={(e) => handleTaskChange(phaseIndex, taskIndex, 'name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            onClick={() => handleTaskChange(phaseIndex, taskIndex, 'showDateRange', !task.showDateRange)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {task.showDateRange ? 'Remove Date Range' : 'Add Date Range'}
          </button>
          
          <button
            onClick={() => addEmployee(phaseIndex, taskIndex)} // Fix: This should not be "Add Task"
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Add Employee
          </button>
          
          <button
            onClick={() => handleTaskChange(phaseIndex, taskIndex, 'showAssumptions', !task.showAssumptions)}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            {task.showAssumptions ? 'Remove Assumptions' : 'Add Assumptions'}
          </button>
          
          {canRemove && (
            <button
              onClick={() => removeTask(phaseIndex, taskIndex)}
              className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              Remove Task
            </button>
          )}
        </div>
      </div>
      
      {task.showDateRange && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={task.startDate || ''}
              onChange={(e) => handleTaskChange(phaseIndex, taskIndex, 'startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={task.endDate || ''}
              onChange={(e) => handleTaskChange(phaseIndex, taskIndex, 'endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
      
      {task.showAssumptions && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assumptions
          </label>
          <textarea
            value={task.assumptions || ''}
            onChange={(e) => handleTaskChange(phaseIndex, taskIndex, 'assumptions', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      {task.employees.map((employee, employeeIndex) => (
        <EmployeeRow
          key={employeeIndex}
          employee={employee}
          employeeIndex={employeeIndex}
          employeeNames={employeeNames}
          onEmployeeChange={handleEmployeeChange}
        />
      ))}
      
      <div className="mt-4">
        <button
          onClick={() => addEmployee(phaseIndex, taskIndex)}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Add Employee
        </button>
      </div>
    </div>
  );
};

export default TaskSection;