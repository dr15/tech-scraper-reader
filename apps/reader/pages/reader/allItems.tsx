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

export function AllItems() {
  return (
    <StyledPage>
      <div>All Items</div>
    </StyledPage>
  );
}

AllItems.Layout = ReaderLayout;

export default AllItems;
