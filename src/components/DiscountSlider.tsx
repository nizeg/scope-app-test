import React from 'react';

interface Props {
  discount: number;
  onChange: (value: number) => void;
}

const DiscountSlider: React.FC<Props> = ({ discount, onChange }) => {
  const getTrackColor = () => {
    if (discount < 0) return 'bg-green-500';
    if (discount > 0) return 'bg-red-500';
    return 'bg-gray-300';
  };
  
  return (
    <div className="mt-6 mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-800">
          {discount < 0 ? 'Premium' : 'Discount'}: {Math.abs(discount)}%
        </h3>
        <span className="text-sm text-gray-600 font-medium">
          {discount < 0 ? 'Premium' : discount > 0 ? 'Discount' : 'No Adjustment'}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="-100"
          max="100"
          value={discount}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${
              discount < 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
            } ${Math.abs(discount)}%, rgb(229, 231, 235) ${Math.abs(discount)}%)`
          }}
        />
        
        <div className="absolute w-full flex justify-between text-xs text-gray-600 mt-1">
          <span>-100% (Premium)</span>
          <span>0%</span>
          <span>100% (Discount)</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountSlider;