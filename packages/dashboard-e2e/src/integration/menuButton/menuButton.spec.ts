describe('dashboard: NavMenuButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=navmenubutton--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to NavMenuButton!');
    });
});
