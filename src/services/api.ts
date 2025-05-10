import axios from 'axios';
import { Phase } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`);
    return response.data.employees;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};

export const calculateQuote = async (phases: Phase[], discount: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quote`, { phases, discount });
    return response.data;
  } catch (error) {
    console.error("Failed to calculate quote:", error);
    throw error;
  }
};

export const exportToExcel = async (phases: Phase[]) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/export/excel`, 
      { phases }, 
      { responseType: 'blob' }
    );
    
    downloadFile(response.data, 'quote.xlsx');
  } catch (error) {
    console.error("Failed to export to Excel:", error);
    throw error;
  }
};

export const exportToPDF = async (phases: Phase[]) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/export/pdf`, 
      { phases }, 
      { responseType: 'blob' }
    );
    
    downloadFile(response.data, 'quote.pdf');
  } catch (error) {
    console.error("Failed to export to PDF:", error);
    throw error;
  }
};

const downloadFile = (data: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};