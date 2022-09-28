import styled from '@emotion/styled';

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

export default Bookmarked;
