import styled from '@emotion/styled';

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function AllItems() {
  return (
    <StyledPage>
      <div>All Items</div>
    </StyledPage>
  );
}

export default AllItems;
