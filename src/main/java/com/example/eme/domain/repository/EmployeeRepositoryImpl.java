package com.example.eme.domain.repository;

import static com.example.eme.domain.entity.QDepartment.department;
import static com.example.eme.domain.entity.QEmployee.employee;

import java.util.List;

import com.example.eme.domain.dto.EmployeeResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class EmployeeRepositoryImpl implements EmployeeRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<EmployeeResponse> findAllWithDepartment() {
        return queryFactory
                .select(Projections.constructor(EmployeeResponse.class, employee)) // DTO로 바로 조회
                .from(employee)
                .leftJoin(employee.department, department).fetchJoin() // 패치 조인으로 N+1 방지
                .fetch();
    }
}
