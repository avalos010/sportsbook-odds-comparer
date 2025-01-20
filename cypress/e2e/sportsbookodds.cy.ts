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

describe("Player Props Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays player props for selected sport, event, and markets", () => {
    // Navigate to the odds page for NBA (while its active)
    cy.get('[data-cy="bars-icon"]').click();
    cy.get('[data-cy="nba-link"]').click();
    cy.url().should("include", "/basketball_nba");

    // Find the game you want to view player props for
    cy.get('[data-cy="odds-table"]').first();

    // Click the "View Player Props" button
    cy.get('[data-cy="player-props-link"]').first().click();

    // Assert that the player props page is displayed
    cy.url().should("include", "/odds/playerProps");
    cy.get('[data-cy="combobox"]').should("exist");
  });

  //TODO!: Add test testing player prop odds.
});
