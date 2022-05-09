import { render } from '@testing-library/react';

import WpDashboard from './wp-dashboard';

describe('WpDashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WpDashboard />);
    expect(baseElement).toBeTruthy();
  });
});
