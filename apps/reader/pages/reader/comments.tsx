import styled from '@emotion/styled';
import ReaderLayout from '../../components/ReaderLayout';

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Comments() {
  return (
    <StyledPage>
      <div>Comments</div>
    </StyledPage>
  );
}

Comments.Layout = ReaderLayout;

export default Comments;
