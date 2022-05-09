import styled from 'styled-components';

/* eslint-disable-next-line */
export interface WpDashboardProps {}

const StyledWpDashboard = styled.div`
  color: pink;
`;

export function WpDashboard(props: WpDashboardProps) {
  return (
    <StyledWpDashboard>
      <h1>Welcome to WpDashboard!</h1>
    </StyledWpDashboard>
  );
}

export default WpDashboard;
