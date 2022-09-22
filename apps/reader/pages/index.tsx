import styled from '@emotion/styled';
import Link from 'next/link';

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 0;
`;

export function Index() {
  return (
    <StyledPage>
      <div>
        <Title>Welcome to Tech Reader!</Title>
        Please go <Link href={'reader'}>HERE</Link>
      </div>
    </StyledPage>
  );
}

export default Index;
