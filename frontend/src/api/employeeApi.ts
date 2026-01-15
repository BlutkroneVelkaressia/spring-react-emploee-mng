import * as client from '@utils/api'
import type { Employee, EmployeeRequest } from '@/types/employee'

export const getEmployee = async () => {
    const response = await client.get<Employee[]>('/api/employees');
    return response;
}

export const createEmployee = async (data: EmployeeRequest) => {
    const response = await client.post<number>('/api/employees', data);
    return response;
};

export const updateEmployee = async (id: number, data: EmployeeRequest) => {
    await client.put(`/api/employees/${id}`, data);
};

export const deleteEmployee = async (id: number) => {
    await client.del(`/api/employees/${id}`);
};