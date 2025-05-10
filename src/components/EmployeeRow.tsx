import React from 'react';
import { Employee, EmployeeData } from '../types';
import { formatCurrency } from '../utils/formatters';

interface Props {
  employee: Employee;
  employeeIndex: number;
  employeeNames: EmployeeData[];
  onEmployeeChange: (employeeIndex: number, updatedEmployee: Employee) => void;
}

const EmployeeRow: React.FC<Props> = ({
  employee,
  employeeIndex,
  employeeNames,
  onEmployeeChange,
}) => {
  const handleNameChange = (newValue: string) => {
    const selectedEmployee = employeeNames.find(emp => emp.name === newValue);
    
    onEmployeeChange(employeeIndex, {
      ...employee,
      name: newValue,
      hourly_rate: selectedEmployee ? selectedEmployee.hourly_rate : 0,
      cost: selectedEmployee ? selectedEmployee.cost : 0,
      department: selectedEmployee ? selectedEmployee.department : ''
    });
  };

  const handleHoursChange = (hours: number) => {
    onEmployeeChange(employeeIndex, {
      ...employee,
      hours
    });
  };

  const handleAssumptionsChange = (assumptions: string) => {
    onEmployeeChange(employeeIndex, {
      ...employee,
      assumptions
    });
  };

  return (
    <div className="mt-4 ml-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee Name
          </label>
          <div className="relative">
            <select
              value={employee.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Employee</option>
              {employeeNames.map((emp, index) => (
                <option key={index} value={emp.name}>
                  {emp.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-700">Department</p>
          <p className="text-sm text-gray-800">{employee.department || '-'}</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hours
          </label>
          <input
            type="number"
            min="0"
            value={employee.hours || ''}
            onChange={(e) => handleHoursChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="md:col-span-2">
          <p className="text-sm font-medium text-gray-700">Hourly Rate</p>
          <p className="text-sm text-gray-800">
            {formatCurrency(employee.hourly_rate)}
          </p>
        </div>
        
        <div className="md:col-span-3">
          <p className="text-sm font-medium text-gray-700">Total Cost</p>
          <p className="text-sm font-semibold text-gray-800">
            {formatCurrency(employee.hours * employee.hourly_rate)}
          </p>
        </div>
      </div>
      
      {employee.assumptions !== undefined && (
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assumptions
          </label>
          <textarea
            value={employee.assumptions}
            onChange={(e) => handleAssumptionsChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeRow;