package com.example.eme.domain.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.eme.domain.service.EmployeeService;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest(EmployeeController.class) // Controller 레이어만 로드
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc; // HTTP 요청 시뮬레이션

    @MockitoBean
    private EmployeeService employeeService; // Service는 Mock 처리

    @Test
    @DisplayName("직원 목록 조회 API 테스트")
    void getEmployees_Success() throws Exception {
        // given
        given(employeeService.getAllEmployees()).willReturn(List.of()); // 빈 리스트 반환 가정

        // when & then
        mockMvc.perform(get("/api/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()); // 200 OK 확인
    }
}