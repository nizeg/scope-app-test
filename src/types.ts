export interface Employee {
  name: string;
  hours: number;
  hourly_rate: number;
  cost: number;
  department: string;
  assumptions: string;
}

export interface Task {
  name: string;
  showDateRange: boolean;
  showAssumptions: boolean;
  startDate?: string;
  endDate?: string;
  assumptions?: string;
  employees: Employee[];
}

export interface Phase {
  name: string;
  showDateRange: boolean;
  startDate?: string;
  endDate?: string;
  tasks: Task[];
}

export interface ClientInfo {
  clientName: string;
  matterName: string;
  matterNumber: string;
  leadLawyer: string;
}

export interface EmployeeData {
  name: string;
  hourly_rate: number;
  cost: number;
  department: string;
}

export interface QuoteResult {
  discounted_cost: number;
}