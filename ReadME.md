# 직원 관리 시스템 (Employee Management System)

Spring Boot와 React를 활용한 풀스택 직원 관리 웹 애플리케이션입니다.

## 프로젝트 설명

이 프로젝트는 직원 정보를 관리하는 CRUD 기능을 제공하는 웹 애플리케이션입니다. 
- **백엔드**: Spring Boot 4.0.1, Java 21, JPA, QueryDSL, H2 Database
- **프론트엔드**: React 19, TypeScript, Vite, TanStack Query, Styled Components

### 주요 기능
- 직원 목록 조회
- 직원 등록
- 직원 정보 수정
- 직원 삭제
- 부서별 직원 관리

---

## 프로젝트 설정

### 백엔드

#### 기술 스택
- **Java**: 21
- **Spring Boot**: 4.0.1
- **Spring Data JPA**: 데이터베이스 접근
- **QueryDSL**: 타입 안전한 쿼리 작성
- **H2 Database**: 인메모리 데이터베이스 (개발용)
- **Lombok**: 보일러플레이트 코드 감소
- **Gradle**: 빌드 도구

#### 주요 의존성
```gradle
- spring-boot-starter-webmvc
- spring-boot-starter-data-jpa
- spring-boot-starter-validation
- querydsl-jpa (5.0.0)
- h2database
- lombok
```

#### 데이터베이스 설정
- **개발 환경**: H2 인메모리 데이터베이스
- **포트**: 8080
- **H2 콘솔**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:employeedb`
  - Username: `sa`
  - Password: (비어있음)

#### 초기 데이터
애플리케이션 시작 시 다음 부서가 자동으로 생성됩니다:
- 개발팀 (ID: 1)
- 마케팅팀 (ID: 2)
- 인사팀 (ID: 3)

### 프론트엔드

#### 기술 스택
- **React**: 19.2.0
- **TypeScript**: 5.9.3
- **Vite**: 7.2.4 (빌드 도구)
- **TanStack Query**: 5.90.17 (서버 상태 관리)
- **React Router**: 7.12.0 (라우팅)
- **Axios**: 1.13.2 (HTTP 클라이언트)
- **Styled Components**: 6.3.6 (CSS-in-JS)
- **Tailwind CSS**: 4.1.18 (유틸리티 CSS)
- **ESLint**: 코드 품질 관리

#### 주요 의존성
```json
- @tanstack/react-query
- axios
- react-router-dom
- styled-components
- @tailwindcss/postcss
```

#### 개발 서버
- **포트**: 5174 (기본값, 사용 가능한 포트로 자동 할당)
- **API Base URL**: http://localhost:8080

---

## 프로젝트 구조

### 백엔드

```
src/main/java/com/example/eme/
├── domain/
│   ├── controller/
│   │   └── EmployeeController.java      # REST API 컨트롤러
│   ├── dto/
│   │   ├── EmployeeRequest.java         # 직원 요청 DTO
│   │   └── EmployeeResponse.java        # 직원 응답 DTO
│   ├── entity/
│   │   ├── Employee.java                # 직원 엔티티
│   │   └── Department.java              # 부서 엔티티
│   ├── repository/
│   │   ├── EmployeeRepository.java      # JPA 리포지토리
│   │   ├── EmployeeRepositoryCustom.java
│   │   ├── EmployeeRepositoryImpl.java  # QueryDSL 구현
│   │   └── DepartmentRepository.java
│   └── service/
│       └── EmployeeService.java         # 비즈니스 로직
├── global/
│   └── config/
│       ├── CorsConfig.java              # CORS 설정
│       └── QueryDslConfig.java          # QueryDSL 설정
└── SpringEmployeeManagerExApplication.java
```

#### 주요 파일 설명
- **EmployeeController**: `/api/employees` 엔드포인트 제공
- **EmployeeService**: 직원 관련 비즈니스 로직 처리
- **CorsConfig**: 프론트엔드와의 CORS 통신 허용 설정
- **QueryDslConfig**: QueryDSL JPAQueryFactory 빈 설정

### 프론트엔드

```
frontend/src/
├── api/
│   └── employeeApi.ts                   # 직원 API 호출 함수
├── components/
│   └── employee/
│       └── EmployeePage.styled.ts       # Styled Components
├── lib/
│   ├── axios.ts                         # Axios 인스턴스 설정
│   └── queryClient.ts                   # React Query 클라이언트
├── pages/
│   └── EmployeePage.tsx                 # 직원 관리 페이지
├── providers/
│   ├── QueryProvider.tsx                # React Query Provider
│   └── RouterProvider.tsx               # React Router Provider
├── types/
│   ├── employee.ts                      # 직원 타입 정의
│   └── index.ts                         # 공통 타입 정의
├── utils/
│   └── api.ts                           # API 유틸리티 함수
├── App.tsx                              # 메인 앱 컴포넌트
└── main.tsx                             # 진입점
```

#### 주요 파일 설명
- **EmployeePage.tsx**: 직원 CRUD 기능을 제공하는 메인 페이지
- **employeeApi.ts**: 백엔드 API 호출 함수 모음
- **axios.ts**: Axios 인스턴스 및 인터셉터 설정
- **EmployeePage.styled.ts**: Styled Components로 작성된 스타일 컴포넌트

---

## 프로젝트 진행 중 발생한 문제 및 해결방법

### 1. 데이터베이스 연결 오류
**문제**: Spring Boot 시작 시 H2 드라이버를 찾을 수 없음
```
Cannot load driver class: org.h2.Driver
```

**해결방법**:
- `build.gradle`에서 H2 의존성을 `runtimeOnly`에서 `implementation`으로 변경
- `application.properties`에서 `driver-class-name` 제거 (Spring Boot 자동 감지)

### 2. 데이터베이스 초기화 스크립트 오류
**문제**: 테스트 실행 시 `data.sql` 스크립트 실행 실패
```
ScriptStatementFailedException
```

**해결방법**:
- 테스트 설정(`src/test/resources/application.properties`)에 `spring.sql.init.mode=never` 추가
- `data.sql`의 SQL 구문을 H2 호환 형식으로 수정

### 3. CORS 오류
**문제**: 프론트엔드에서 백엔드 API 호출 시 CORS 정책 위반
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**해결방법**:
- `CorsConfig.java` 생성하여 전역 CORS 설정 추가
- 모든 origin 허용 (개발 환경용)

### 4. API URL 중복 문제
**문제**: API 호출 시 `/api/api/employees`로 중복 호출
```
GET http://localhost:8080/api/api/employees 404 (Not Found)
```

**해결방법**:
- `axios.ts`의 `baseURL`을 `http://localhost:8080`으로 변경
- `employeeApi.ts`에서 모든 엔드포인트에 `/api` 접두사 명시

### 5. React Query 데이터 undefined 오류
**문제**: API 응답이 `undefined`로 반환됨
```
Query data cannot be undefined
```

**해결방법**:
- `api.ts`에서 `ApiResponse` 래퍼 제거 (백엔드가 직접 데이터 반환)
- `employeeApi.ts`에서 `response.data` 제거

### 6. Tailwind CSS PostCSS 플러그인 오류
**문제**: Tailwind CSS v4 PostCSS 플러그인 오류
```
It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin
```

**해결방법**:
- `@tailwindcss/postcss` 패키지 설치
- `postcss.config.js`에서 `tailwindcss` → `@tailwindcss/postcss`로 변경

### 7. Gradle Wrapper 파일 누락
**문제**: `gradle-wrapper.jar` 파일이 없어 빌드 실패
```
Unable to access jarfile gradle-wrapper.jar
```

**해결방법**:
- PowerShell을 사용하여 `gradle-wrapper.jar` 다운로드
- 또는 `gradle wrapper` 명령어로 재생성

### 8. ESLint 오류 (any 타입 사용)
**문제**: TypeScript ESLint에서 `any` 타입 사용 금지
```
Unexpected any. Specify a different type.
```

**해결방법**:
- `api.ts`에서 `any` 타입을 `AxiosRequestConfig`와 `unknown`으로 변경

---

## 실행방법

### 사전 요구사항
- **Java**: 21 이상
- **Node.js**: 18 이상
- **npm** 또는 **yarn**

### 백엔드 실행

1. 프로젝트 루트 디렉토리로 이동
```bash
cd spring-react-emploee-mng
```

2. Gradle Wrapper를 사용하여 애플리케이션 실행
```bash
# Windows
.\gradlew bootRun

# Linux/Mac
./gradlew bootRun
```

3. 애플리케이션이 시작되면 다음 URL에서 확인 가능:
   - API: http://localhost:8080/api/employees
   - H2 콘솔: http://localhost:8080/h2-console

### 프론트엔드 실행

1. 프론트엔드 디렉토리로 이동
```bash
cd frontend
```

2. 의존성 설치 (최초 1회)
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 http://localhost:5174 접속

### 빌드

#### 백엔드 빌드
```bash
.\gradlew build
```

#### 프론트엔드 빌드
```bash
cd frontend
npm run build
```

### 테스트 실행

#### 백엔드 테스트
```bash
.\gradlew test
```

#### 프론트엔드 린트
```bash
cd frontend
npm run lint
```

---

## API 엔드포인트

### 직원 관리 API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | 직원 목록 조회 |
| POST | `/api/employees` | 직원 등록 |
| PUT | `/api/employees/{id}` | 직원 정보 수정 |
| DELETE | `/api/employees/{id}` | 직원 삭제 |

### 요청/응답 예시

#### 직원 목록 조회 (GET /api/employees)
```json
[
  {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com",
    "role": "MANAGER",
    "departmentName": "개발팀"
  }
]
```

#### 직원 등록 (POST /api/employees)
**Request Body:**
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "role": "MANAGER",
  "departmentId": 1
}
```

**Response:**
```json
1
```

---

## 개발 환경 설정

### IDE 설정
- **IntelliJ IDEA** 또는 **VS Code** 권장
- **Java Extension Pack** (VS Code)
- **ES7+ React/Redux/React-Native snippets** (VS Code)

### 환경 변수
프론트엔드에서 API Base URL을 변경하려면 `.env` 파일 생성:
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 라이선스

이 프로젝트는 데모 목적으로 작성되었습니다.
