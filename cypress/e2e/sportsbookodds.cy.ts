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
  it("displays player props for selected sport, event, and markets", () => {
    cy.visit("/");

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

  it("shows correct player props line and odds", () => {
    const testURL =
      "/odds/playerProps?sport=basketball_nba&event=a75904869ceb53ced4baae29638d4907&markets=player_assists&marketsLabel=Assists";

    cy.visit(testURL);

    cy.get('[data-cy="player-props-item"]').first().should("be.visible");
    cy.get('[data-cy="player-props-item"]')
      .first()
      .children('[data-cy="player-name"]')
      .invoke("text")
      .should("eq", "Tyrese Haliburton");

    cy.get('[data-cy="player-props-odds-item"]').first().should("be.visible");
    cy.get('[data-cy="player-props-odds-item"]')
      .first()
      .children('[data-cy="odds-price"]')
      .invoke("text")
      .should("eq", "-120");

    cy.get('[data-cy="player-props-odds-item"]').first().should("be.visible");
    cy.get('[data-cy="player-props-odds-item"]')
      .first()
      .children('[data-cy="odds-point"]')
      .invoke("text")
      .should("eq", "Over 10.5");

    cy.get('[data-cy="player-props-odds-item"]')
      .first()
      .children('[data-cy="odds-book"]')
      .invoke("text")
      .should("eq", "DraftKings");
  });
});
