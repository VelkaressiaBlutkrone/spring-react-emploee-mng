export interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    departmentName: string;
  }
  
  export interface EmployeeRequest {
    name: string;
    email: string;
    role: string;
    departmentId: number;
  }