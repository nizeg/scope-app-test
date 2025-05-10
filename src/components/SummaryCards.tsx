import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface Props {
  totalCost: number | null;
  discountedCost: number | null;
  profitability: number | null;
  totalHours: number;
  blendedRate: number | null;
}

const SummaryCards: React.FC<Props> = ({
  totalCost,
  discountedCost,
  profitability,
  totalHours,
  blendedRate
}) => {
  if (totalCost === null) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Quote Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 transition-transform hover:scale-105">
          <h3 className="text-center font-bold text-gray-700 mb-2">Total Cost</h3>
          <p className="text-center text-xl text-blue-600 font-semibold">
            {formatCurrency(totalCost)}
          </p>
        </div>
        
        {discountedCost !== null && (
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 transition-transform hover:scale-105">
            <h3 className="text-center font-bold text-gray-700 mb-2">Discounted Cost</h3>
            <p className="text-center text-xl text-blue-600 font-semibold">
              {formatCurrency(discountedCost)}
            </p>
          </div>
        )}
        
        {profitability !== null && (
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 transition-transform hover:scale-105">
            <h3 className="text-center font-bold text-gray-700 mb-2">Profitability</h3>
            <p className="text-center text-xl text-blue-600 font-semibold">
              {profitability.toFixed(1)}%
            </p>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 transition-transform hover:scale-105">
          <h3 className="text-center font-bold text-gray-700 mb-2">Total Hours</h3>
          <p className="text-center text-xl text-blue-600 font-semibold">
            {totalHours}
          </p>
        </div>
        
        {blendedRate !== null && (
          <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200 transition-transform hover:scale-105">
            <h3 className="text-center font-bold text-gray-700 mb-2">Blended Rate</h3>
            <p className="text-center text-xl text-blue-600 font-semibold">
              {formatCurrency(blendedRate)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCards;