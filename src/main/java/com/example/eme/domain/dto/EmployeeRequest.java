package com.example.eme.domain.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class EmployeeRequest {
    private String name;
    private String email;
    private String role;
    private Long departmentId; // 부서 ID만 받음
}
