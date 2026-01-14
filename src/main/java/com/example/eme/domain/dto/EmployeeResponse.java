package com.example.eme.domain.dto;

import com.example.eme.domain.entity.Employee;

import lombok.Getter;

@Getter
public class EmployeeResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String departmentName; // 부서 이름 포함

    // Entity -> DTO 변환 생성자
    public EmployeeResponse(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.email = employee.getEmail();
        this.role = employee.getRole();
        // 부서가 없을 경우 null 처리
        this.departmentName = (employee.getDepartment() != null) ? employee.getDepartment().getName() : "소속 없음";
    }
}