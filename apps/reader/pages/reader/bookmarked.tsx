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

export function Bookmarked() {
  return (
    <StyledPage>
      <div>Bookmarked</div>
    </StyledPage>
  );
}

Bookmarked.Layout = ReaderLayout;

export default Bookmarked;
