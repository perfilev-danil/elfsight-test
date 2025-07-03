import styled from 'styled-components';
import widgetLogo from '../../assets/widget-logo.png';

export function Logo() {
  return (
    <a href="/">
      <StyledLogo src={widgetLogo} alt="logo" />
    </a>
  );
}

const StyledLogo = styled.img`
  max-width: 300px;
  user-select: none;

  @media (max-width: 930px) {
    margin-bottom: 20px;
  }
`;
