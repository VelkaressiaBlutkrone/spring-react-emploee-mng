import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEmployee, createEmployee, deleteEmployee, updateEmployee } from '@api/employeeApi';
import type { EmployeeRequest, Employee } from '@/types/employee';
import * as compoents from '@/components/employee/EmployeePage.styled';

const EmployeePage = () => {
    const queryClient = useQueryClient();

    // 폼 입력 상태 관리
    const [formData, setFormData] = useState<EmployeeRequest>({
        name: '',
        email: '',
        role: '',
        departmentId: 1, // 기본값: 개발팀(ID 1)
    });

    // 수정 모드 관리 (null이면 등록 모드, ID가 있으면 수정 모드)
    const [editingId, setEditingId] = useState<number | null>(null);

    // 1. 조회 (Read)
    const { data: employees, isLoading, isError } = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployee,
    });

    // 2. 등록/수정/삭제 Mutation 설정
    // 성공 시 queryClient.invalidateQueries를 호출하여 목록을 자동 새로고침합니다.

    const createMutation = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            resetForm();
            alert('등록되었습니다.');
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: EmployeeRequest) => updateEmployee(editingId!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            resetForm();
            alert('수정되었습니다.');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            alert('삭제되었습니다.');
        },
    });

    // 핸들러 함수들
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateMutation.mutate(formData);
        } else {
            createMutation.mutate(formData);
        }
    };

    const handleEditClick = (emp: Employee) => {
        setEditingId(emp.id);
        // 수정 시 부서 ID는 화면에 없으므로 임시로 1 설정 혹은 별도 로직 필요. 여기선 1로 가정.
        setFormData({
            name: emp.name,
            email: emp.email,
            role: emp.role,
            departmentId: 1,
        });
    };

    const handleDeleteClick = (id: number) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteMutation.mutate(id);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', role: '', departmentId: 1 });
        setEditingId(null);
    };

    if (isLoading) return <compoents.LoadingMessage>로딩 중...</compoents.LoadingMessage>;
    if (isError) return <compoents.ErrorMessage>에러가 발생했습니다.</compoents.ErrorMessage>;

    return (
        <compoents.PageContainer>
            <compoents.PageTitle>직원 관리 시스템</compoents.PageTitle>

            {/* 입력 폼 */}
            <compoents.FormContainer>
                <compoents.FormTitle>{editingId ? '직원 정보 수정' : '신규 직원 등록'}</compoents.FormTitle>
                <compoents.FormGrid onSubmit={handleSubmit}>
                    <compoents.FormField>
                        <compoents.Label>이름</compoents.Label>
                        <compoents.Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </compoents.FormField>
                    <compoents.FormField>
                        <compoents.Label>이메일</compoents.Label>
                        <compoents.Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </compoents.FormField>
                    <compoents.FormField>
                        <compoents.Label>직급</compoents.Label>
                        <compoents.Input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                        />
                    </compoents.FormField>
                    <compoents.FormField>
                        <compoents.Label>부서ID</compoents.Label>
                        <compoents.Input
                            type="number"
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleInputChange}
                            required
                        />
                    </compoents.FormField>
                    <compoents.ButtonGroup>
                        <compoents.SubmitButton type="submit" $isEditing={!!editingId}>
                            {editingId ? '수정' : '등록'}
                        </compoents.SubmitButton>
                        {editingId && (
                            <compoents.CancelButton type="button" onClick={resetForm}>
                                취소
                            </compoents.CancelButton>
                        )}
                    </compoents.ButtonGroup>
                </compoents.FormGrid>
            </compoents.FormContainer>

            {/* 직원 목록 테이블 */}
            <compoents.TableContainer>
                <compoents.Table>
                    <compoents.TableHeader>
                        <compoents.TableRow>
                            <compoents.TableHeaderCell>ID</compoents.TableHeaderCell>
                            <compoents.TableHeaderCell>이름</compoents.TableHeaderCell>
                            <compoents.TableHeaderCell>이메일</compoents.TableHeaderCell>
                            <compoents.TableHeaderCell>직급</compoents.TableHeaderCell>
                            <compoents.TableHeaderCell>부서명</compoents.TableHeaderCell>
                            <compoents.TableHeaderCell>관리</compoents.TableHeaderCell>
                        </compoents.TableRow>
                    </compoents.TableHeader>
                    <compoents.TableBody>
                        {employees?.map((emp) => (
                            <compoents.TableRow key={emp.id}>
                                <compoents.TableCell>{emp.id}</compoents.TableCell>
                                <compoents.TableCellBold>{emp.name}</compoents.TableCellBold>
                                <compoents.TableCell>{emp.email}</compoents.TableCell>
                                <compoents.TableCell>{emp.role}</compoents.TableCell>
                                <compoents.TableCell>{emp.departmentName}</compoents.TableCell>
                                <compoents.TableCell>
                                    <compoents.ActionButtonContainer>
                                        <compoents.EditButton onClick={() => handleEditClick(emp)}>수정</compoents.EditButton>
                                        <compoents.DeleteButton onClick={() => handleDeleteClick(emp.id)}>삭제</compoents.DeleteButton>
                                    </compoents.ActionButtonContainer>
                                </compoents.TableCell>
                            </compoents.TableRow>
                        ))}
                        {employees?.length === 0 && (
                            <compoents.TableRow>
                                <compoents.EmptyMessage colSpan={6}>등록된 직원이 없습니다.</compoents.EmptyMessage>
                            </compoents.TableRow>
                        )}
                    </compoents.TableBody>
                </compoents.Table>
            </compoents.TableContainer>
        </compoents.PageContainer>
    );
};

export default EmployeePage;