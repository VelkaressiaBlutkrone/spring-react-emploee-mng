package com.example.eme.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.eme.domain.dto.EmployeeRequest;
import com.example.eme.domain.dto.EmployeeResponse;
import com.example.eme.domain.entity.Department;
import com.example.eme.domain.entity.Employee;
import com.example.eme.domain.repository.DepartmentRepository;
import com.example.eme.domain.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    // 조회
    public List<EmployeeResponse> getAllEmployees() {
        return employeeRepository.findAllWithDepartment(); // QueryDSL 사용
    }

    // 등록
    @Transactional
    public Long createEmployee(EmployeeRequest request) {
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("부서를 찾을 수 없습니다."));

        Employee employee = Employee.builder()
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .department(department)
                .build();

        return employeeRepository.save(employee).getId();
    }

    // 수정 (Dirty Checking)
    @Transactional
    public void updateEmployee(Long id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("직원을 찾을 수 없습니다."));
        
        Department department = departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("부서를 찾을 수 없습니다."));

        employee.updateInfo(request.getName(), request.getRole(), department);
    }

    // 삭제
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("직원을 찾을 수 없습니다."));
        employeeRepository.delete(employee);
    }
}