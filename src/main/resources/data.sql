-- 초기 부서 데이터 삽입 (H2 호환)
-- 중복 데이터 방지를 위해 조건부 삽입
INSERT INTO department (dept_id, name) 
SELECT 1, '개발팀' WHERE NOT EXISTS (SELECT 1 FROM department WHERE dept_id = 1);

INSERT INTO department (dept_id, name) 
SELECT 2, '마케팅팀' WHERE NOT EXISTS (SELECT 1 FROM department WHERE dept_id = 2);

INSERT INTO department (dept_id, name) 
SELECT 3, '인사팀' WHERE NOT EXISTS (SELECT 1 FROM department WHERE dept_id = 3);
