import styled from 'styled-components';

// 페이지 컨테이너
export const PageContainer = styled.div`
  padding: 1.5rem;
  max-width: 72rem;
  margin: 0 auto;
`;

// 페이지 제목
export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1f2937;
`;

// 폼 컨테이너
export const FormContainer = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
`;

// 폼 제목
export const FormTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

// 폼 그리드
export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: end;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

// 폼 필드 컨테이너
export const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

// 라벨
export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

// 입력 필드
export const Input = styled.input`
  margin-top: 0.25rem;
  display: block;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// 버튼 (기본)
const BaseButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// 등록 버튼
export const SubmitButton = styled(BaseButton)<{ $isEditing?: boolean }>`
  width: 100%;
  background-color: ${props => (props.$isEditing ? '#eab308' : '#2563eb')};

  &:hover {
    background-color: ${props => (props.$isEditing ? '#ca8a04' : '#1d4ed8')};
  }
`;

// 취소 버튼
export const CancelButton = styled(BaseButton)`
  background-color: #6b7280;

  &:hover {
    background-color: #4b5563;
  }
`;

// 테이블 컨테이너
export const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

// 테이블
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

// 테이블 헤더
export const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

// 테이블 헤더 셀
export const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// 테이블 바디
export const TableBody = styled.tbody`
  background-color: white;
`;

// 테이블 행
export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    background-color: #f9fafb;
  }
`;

// 테이블 셀
export const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
  color: #6b7280;
`;

// 테이블 셀 (강조)
export const TableCellBold = styled(TableCell)`
  font-weight: 500;
  color: #111827;
`;

// 액션 버튼 컨테이너
export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  white-space: nowrap;
  font-weight: 500;
`;

// 수정 버튼
export const EditButton = styled.button`
  color: #4f46e5;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    color: #4338ca;
  }
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  color: #dc2626;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    color: #b91c1c;
  }
`;

// 빈 상태 메시지
export const EmptyMessage = styled.td`
  text-align: center;
  padding: 1rem;
  color: #6b7280;
`;

// 로딩 메시지
export const LoadingMessage = styled.div`
  padding: 1.5rem;
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  padding: 1.5rem;
  color: #ef4444;
`;
