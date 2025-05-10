git remote add origin <your-github-repo-url>import React from 'react';
import { Phase, EmployeeData } from '../types';
import TaskSection from './TaskSection';

interface Props {
  phase: Phase;
  phaseIndex: number;
  handlePhaseChange: (index: number, field: keyof Phase, value: any) => void;
  handleTaskChange: (phaseIndex: number, taskIndex: number, field: string, value: any) => void;
  addTask: (phaseIndex: number) => void;
  removeTask: (phaseIndex: number, taskIndex: number) => void;
  addEmployee: (phaseIndex: number, taskIndex: number) => void;
  employeeNames: EmployeeData[];
}

const PhaseCard: React.FC<Props> = ({
  phase,
  phaseIndex,
  handlePhaseChange,
  handleTaskChange,
  addTask,
  removeTask,
  addEmployee,
  employeeNames
}) => {
  return (
    <div className="mb-6 bg-gray-50 rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-4 bg-blue-700 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Phase Name
            </label>
            <input
              type="text"
              value={phase.name}
              onChange={(e) => handlePhaseChange(phaseIndex, 'name', e.target.value)}
              className="w-full px-3 py-2 bg-blue-600 text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-300"
              placeholder="Enter phase name"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={() => handlePhaseChange(phaseIndex, 'showDateRange', !phase.showDateRange)}
              className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              {phase.showDateRange ? 'Remove Date Range' : 'Add Date Range'}
            </button>
          </div>
        </div>
        
        {phase.showDateRange && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={phase.startDate || ''}
                onChange={(e) => handlePhaseChange(phaseIndex, 'startDate', e.target.value)}
                className="w-full px-3 py-2 bg-blue-600 text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                End Date
              </label>
              <input
                type="date"
                value={phase.endDate || ''}
                onChange={(e) => handlePhaseChange(phaseIndex, 'endDate', e.target.value)}
                className="w-full px-3 py-2 bg-blue-600 text-white border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {phase.tasks.map((task, taskIndex) => (
          <TaskSection
            key={taskIndex}
            task={task}
            taskIndex={taskIndex}
            phaseIndex={phaseIndex}
            handleTaskChange={handleTaskChange}
            addEmployee={addEmployee}
            employeeNames={employeeNames}
            isFirstTask={taskIndex === 0}
            canRemove={taskIndex > 0}
            removeTask={removeTask}
          />
        ))}
        <div className="mt-4">
          <button
            onClick={() => addTask(phaseIndex)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhaseCard;