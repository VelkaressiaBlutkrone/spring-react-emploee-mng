package com.example.eme.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.eme.domain.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>, EmployeeRepositoryCustom {
    
}