package com.example.eme.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.eme.domain.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
