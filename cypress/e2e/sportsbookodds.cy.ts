describe("Sportsbook Odds", () => {
  it("loads", () => {
    cy.visit("/");
    cy.get('[data-cy="odds-ml-item"]').should("be.visible");
  });

  it("links load up correct page", () => {
    cy.visit("/");
    cy.get('[data-cy="bars-icon"]').click();
    cy.get('[data-cy="nfl-link"]').click();
    cy.url().should("include", "/americanfootball_nfl");

    //TODO! Find a way to run this test only when NBA season/preaseason starts
    // cy.get('[data-cy="bars-icon"]').click();
    // cy.get('[data-cy="nba-link"]').click();
    // cy.url().should("include", "/basketball_nba");
  });
});
