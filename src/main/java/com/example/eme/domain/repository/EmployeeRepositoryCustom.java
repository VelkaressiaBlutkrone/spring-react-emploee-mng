package com.example.eme.domain.repository;

import java.util.List;

import com.example.eme.domain.dto.EmployeeResponse;

public interface EmployeeRepositoryCustom {
    List<EmployeeResponse> findAllWithDepartment();
}