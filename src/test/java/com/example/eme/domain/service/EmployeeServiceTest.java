package com.example.eme.domain.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import com.example.eme.domain.dto.EmployeeRequest;
import com.example.eme.domain.entity.Department;
import com.example.eme.domain.entity.Employee;
import com.example.eme.domain.repository.DepartmentRepository;
import com.example.eme.domain.repository.EmployeeRepository;

@ExtendWith(MockitoExtension.class) // Mockito 환경 사용
class EmployeeServiceTest {

    @InjectMocks
    private EmployeeService employeeService; // 테스트 대상

    @Mock
    private EmployeeRepository employeeRepository; // 가짜 객체

    @Mock
    private DepartmentRepository departmentRepository; // 가짜 객체

    @Test
    @DisplayName("직원 등록 성공 테스트")
    @SuppressWarnings("null")
    void createEmployee_Success() {
        // given (준비)
        Long fakeDeptId = 1L;
        Department department = Department.builder().name("개발팀").build();
        
        // Mocking: DB 조회 시 '개발팀'이 나온다고 가정
        given(departmentRepository.findById(fakeDeptId)).willReturn(Optional.of(department));

        // Mocking: 저장 후 ID가 1인 Employee가 반환된다고 가정
        Employee savedEmployee = Employee.builder()
                .name("홍길동")
                .email("test@test.com")
                .role("STAFF")
                .department(department)
                .build();
        ReflectionTestUtils.setField(savedEmployee, "id", 1L); // ID 강제 주입

        given(employeeRepository.save(any(Employee.class))).willReturn(savedEmployee);

        // 요청 객체 생성 (ReflectionTestUtils로 private 필드 설정 가능하지만, 여기선 테스트용 생성자나 라이브러리 사용 권장. 간단히 Mocking으로 대체)
        EmployeeRequest request = new EmployeeRequest(); 
        ReflectionTestUtils.setField(request, "name", "홍길동");
        ReflectionTestUtils.setField(request, "email", "test@test.com");
        ReflectionTestUtils.setField(request, "role", "STAFF");
        ReflectionTestUtils.setField(request, "departmentId", fakeDeptId);

        // when (실행)
        Long newEmployeeId = employeeService.createEmployee(request);

        // then (검증)
        assertThat(newEmployeeId).isEqualTo(1L);
    }
}
