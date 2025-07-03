import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterComponent } from './filter/FilterComponent';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterComponent />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 930px) {
    flex-direction: column;
  }
`;
