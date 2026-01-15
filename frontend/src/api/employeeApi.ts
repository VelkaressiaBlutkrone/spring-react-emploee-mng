import * as client from '@utils/api'
import type { Employee, EmployeeRequest } from '@/types/employee'

export const getEmployee = async () => {
    const response = await client.get<Employee[]>('/employees');
    return response.data;
}

export const createEmployee = async (data: EmployeeRequest) => {
    const response = await client.post<number>('/employees', data);
    return response.data;
};

export const updateEmployee = async (id: number, data: EmployeeRequest) => {
    await client.put(`/employees/${id}`, data);
};

export const deleteEmployee = async (id: number) => {
    await client.del(`/employees/${id}`);
};