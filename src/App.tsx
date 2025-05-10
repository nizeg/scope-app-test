import React, { useState, useEffect, useCallback } from 'react';
import { ClientInfo, Phase, EmployeeData, Task, Employee } from './types';
import ClientInfoCard from './components/ClientInfoCard';
import PhaseCard from './components/PhaseCard';
import SummaryCards from './components/SummaryCards';
import DiscountSlider from './components/DiscountSlider';
import { fetchEmployees, calculateQuote, exportToExcel, exportToPDF } from './services/api';
import { Briefcase, FileSpreadsheet, FileText, Plus, Minus } from 'lucide-react';

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    clientName: '',
    matterName: '',
    matterNumber: '',
    leadLawyer: ''
  });

  const [phases, setPhases] = useState<Phase[]>([{
    name: '',
    showDateRange: false,
    tasks: [{
      name: '',
      showDateRange: false,
      showAssumptions: false,
      employees: [{
        name: '',
        hours: 0,
        hourly_rate: 0,
        cost: 0,
        department: '',
        assumptions: ''
      }]
    }]
  }]);

  const [employeeNames, setEmployeeNames] = useState<EmployeeData[]>([]);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [discountedCost, setDiscountedCost] = useState<number | null>(null);
  const [profitability, setProfitability] = useState<number | null>(null);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [blendedRate, setBlendedRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployeeNames(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        // For demo purposes, create mock employee data if API fails
        setEmployeeNames([
          { name: 'John Smith', hourly_rate: 250, cost: 125, department: 'Corporate' },
          { name: 'Jane Doe', hourly_rate: 300, cost: 150, department: 'Litigation' },
          { name: 'Robert Johnson', hourly_rate: 350, cost: 175, department: 'Tax' },
          { name: 'Sarah Williams', hourly_rate: 275, cost: 137.5, department: 'Employment' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  const calculateTotals = useCallback(async () => {
    try {
      let totalCostCalc = 0;
      let totalEmployeeCost = 0;
      let totalHoursCalc = 0;

      phases.forEach(phase => {
        phase.tasks.forEach(task => {
          task.employees.forEach(employee => {
            totalCostCalc += employee.hours * employee.hourly_rate;
            totalEmployeeCost += employee.hours * employee.cost;
            totalHoursCalc += employee.hours;
          });
        });
      });

      setTotalCost(totalCostCalc);
      setTotalHours(totalHoursCalc);

      try {
        const data = await calculateQuote(phases, discount);
        setDiscountedCost(data.discounted_cost);

        if (data.discounted_cost > 0) {
          const profit = data.discounted_cost - totalEmployeeCost;
          const profitPercentage = (profit / data.discounted_cost) * 100;
          setProfitability(profitPercentage);
        } else {
          setProfitability(0);
        }

        if (totalHoursCalc > 0) {
          setBlendedRate(data.discounted_cost / totalHoursCalc);
        } else {
          setBlendedRate(null);
        }
      } catch (error) {
        console.error("Failed to calculate quote from API:", error);
        // Fallback calculation for demo purposes
        const discountMultiplier = 1 - (discount / 100);
        const calculatedDiscountedCost = totalCostCalc * discountMultiplier;
        setDiscountedCost(calculatedDiscountedCost);
        
        if (calculatedDiscountedCost > 0) {
          const profit = calculatedDiscountedCost - totalEmployeeCost;
          const profitPercentage = (profit / calculatedDiscountedCost) * 100;
          setProfitability(profitPercentage);
        } else {
          setProfitability(0);
        }
        
        if (totalHoursCalc > 0) {
          setBlendedRate(calculatedDiscountedCost / totalHoursCalc);
        } else {
          setBlendedRate(null);
        }
      }
    } catch (error) {
      console.error("Error in calculation:", error);
    }
  }, [phases, discount]);

  useEffect(() => {
    if (!loading) {
      calculateTotals();
    }
  }, [calculateTotals, loading, phases, discount]);

  const handleClientInfoChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePhaseChange = (phaseIndex: number, field: keyof Phase, value: any) => {
    setPhases(prev => {
      const newPhases = [...prev];
      newPhases[phaseIndex] = { ...newPhases[phaseIndex], [field]: value };
      return newPhases;
    });
  };

  const handleTaskChange = (phaseIndex: number, taskIndex: number, field: string, value: any) => {
    setPhases(prev => {
      const newPhases = [...prev];
      if (field === 'employees') {
        newPhases[phaseIndex].tasks[taskIndex].employees = value;
      } else {
        newPhases[phaseIndex].tasks[taskIndex] = {
          ...newPhases[phaseIndex].tasks[taskIndex],
          [field]: value
        };
      }
      return newPhases;
    });
  };

  const addPhase = () => {
    setPhases(prev => [
      ...prev,
      {
        name: '',
        showDateRange: false,
        tasks: [{
          name: '',
          showDateRange: false,
          showAssumptions: false,
          employees: [{
            name: '',
            hours: 0,
            hourly_rate: 0,
            cost: 0,
            department: '',
            assumptions: ''
          }]
        }]
      }
    ]);
  };

  const addTask = (phaseIndex: number) => {
    setPhases(prev => {
      const newPhases = [...prev];
      newPhases[phaseIndex].tasks.push({
        name: '', // Ensure the new task includes a name field
        showDateRange: false,
        showAssumptions: false,
        employees: [] // Start with an empty employees array for the new task
      });
      return newPhases;
    });
  };

  const removeTask = (phaseIndex: number, taskIndex: number) => {
    setPhases(prev => {
      const newPhases = [...prev];
      if (newPhases[phaseIndex].tasks.length > 1) {
        newPhases[phaseIndex].tasks.splice(taskIndex, 1);
      }
      return newPhases;
    });
  };

  const addEmployee = (phaseIndex: number, taskIndex: number) => {
    setPhases(prev => {
      const newPhases = [...prev];
      newPhases[phaseIndex].tasks[taskIndex].employees.push({
        name: '',
        hours: 0,
        hourly_rate: 0,
        cost: 0,
        department: '',
        assumptions: ''
      });
      return newPhases;
    });
  };

  const removeLatestPhase = () => {
    if (phases.length > 1) {
      setPhases(prev => prev.slice(0, -1));
    }
  };

  const handleExportToExcel = async () => {
    try {
      await exportToExcel(phases);
    } catch (error) {
      console.error("Failed to export to Excel:", error);
      alert("Export to Excel failed. Please try again later.");
    }
  };

  const handleExportToPDF = async () => {
    try {
      await exportToPDF(phases);
    } catch (error) {
      console.error("Failed to export to PDF:", error);
      alert("Export to PDF failed. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="banner">
        <div className="parallax"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Legal Fee Quotation Tool
          </h1>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto p-4 md:p-6 -mt-10 relative z-10">
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-3xl w-full">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-blue-700 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Client Information</h2>
            </div>
            
            <ClientInfoCard 
              clientInfo={clientInfo}
              handleClientInfoChange={handleClientInfoChange}
              employeeNames={employeeNames}
            />
          </div>
        </div>
        
        <div className="space-y-6">
          {phases.map((phase, phaseIndex) => (
            <PhaseCard
              key={phaseIndex}
              phase={phase}
              phaseIndex={phaseIndex}
              handlePhaseChange={handlePhaseChange}
              handleTaskChange={handleTaskChange}
              addTask={addTask}
              removeTask={removeTask}
              addEmployee={addEmployee}
              employeeNames={employeeNames}
            />
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 justify-start mt-6 mb-8">
          <button
            onClick={addPhase}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Phase
          </button>
          
          {phases.length > 1 && (
            <button
              onClick={removeLatestPhase}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <Minus className="h-5 w-5 mr-2" />
              Remove Latest Phase
            </button>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Discount/Premium Adjustment</h2>
          <DiscountSlider 
            discount={discount} 
            onChange={setDiscount} 
          />
        </div>
        
        <div className="flex flex-wrap gap-4 justify-start mb-8">
          <button
            onClick={handleExportToExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FileSpreadsheet className="h-5 w-5 mr-2" />
            Export to Excel
          </button>
          
          <button
            onClick={handleExportToPDF}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Export to PDF
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SummaryCards
            totalCost={totalCost}
            discountedCost={discountedCost}
            profitability={profitability}
            totalHours={totalHours}
            blendedRate={blendedRate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;