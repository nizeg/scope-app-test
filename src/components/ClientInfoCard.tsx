import React from 'react';
import { ClientInfo, EmployeeData } from '../types';

interface Props {
  clientInfo: ClientInfo;
  handleClientInfoChange: (field: keyof ClientInfo, value: string) => void;
  employeeNames: EmployeeData[];
}

const ClientInfoCard: React.FC<Props> = ({ 
  clientInfo, 
  handleClientInfoChange,
  employeeNames
}) => {
  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Client Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            value={clientInfo.clientName}
            onChange={(e) => handleClientInfoChange('clientName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matter Name
          </label>
          <input
            type="text"
            value={clientInfo.matterName}
            onChange={(e) => handleClientInfoChange('matterName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matter Number
          </label>
          <input
            type="text"
            value={clientInfo.matterNumber}
            onChange={(e) => handleClientInfoChange('matterNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lead Lawyer
          </label>
          <div className="relative">
            <select
              value={clientInfo.leadLawyer}
              onChange={(e) => handleClientInfoChange('leadLawyer', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Lead Lawyer</option>
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
      </div>
    </div>
  );
};

export default ClientInfoCard;