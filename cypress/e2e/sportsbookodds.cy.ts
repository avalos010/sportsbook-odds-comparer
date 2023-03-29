describe("Sportsbook Odds", () => {
  it("loads", () => {
    cy.visit("/");
    cy.get('[data-cy="odds-ml-item"]').should("be.visible");
  });

  it("links load up correct page", () => {
    cy.visit("/");

    cy.get('[data-cy="nba-link"]').click();
    cy.url().should("include", "/basketball_nba");
  });
});
