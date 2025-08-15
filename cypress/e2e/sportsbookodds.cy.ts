describe("Sportsbook Odds", () => {
  it("loads", () => {
    cy.visit("/");
    cy.get('[data-cy="odds-ml-item"]').should("be.visible");
  });

  it("links load up correct page", () => {
    cy.visit("/");
    cy.get('[data-cy="bars-icon"]').click();

    // Wait for the nav menu to be fully open
    cy.get("#primary-navigation").should("be.visible");

    // The nav component uses sport title in lowercase, so MMA would be "mma-link"
    // Use a more robust approach to find and click the element
    cy.get('[data-cy="mma-link"]')
      .should("exist")
      .should("not.be.disabled")
      .click({ force: true });

    cy.url().should("include", "/mma_mixed_martial_arts");
  });
});

describe("Player Props Page", () => {
  it("displays player props for selected sport, event, and markets", () => {
    cy.visit("/");

    // Navigate to the odds page for NBA (while its active)
    cy.get('[data-cy="bars-icon"]').click();
    cy.get('[data-cy="nba-link"]').should("be.visible").click({ force: true });
    cy.url().should("include", "/basketball_nba");

    // Find the game you want to view player props for
    cy.get('[data-cy="odds-table"]').first();

    // Click the "View Player Props" button
    cy.get('[data-cy="player-props-link"]').first().click({ force: true });

    // Assert that the player props page is displayed
    cy.url().should("include", "/odds/playerProps");
    cy.get('[data-cy="combobox"]').should("exist");
  });

  it("shows correct player props line and odds", () => {
    // Use a real MLB URL with actual data instead of mocking
    // This will work for a month or so until we implement proper mocking
    const testURL =
      "/odds/playerProps?sport=baseball_mlb&event=73e2979c3e4fc9c90a414f5c56d35cdd&markets=batter_hits&marketsLabel=Batter+Hits";

    cy.visit(testURL);

    // First, let's check if the basic page structure loads
    cy.get("main").should("be.visible");
    cy.get("h2").should("contain", "Player Props");

    // Check if the ComboBox is rendered
    cy.get('[data-cy="combobox"]').should("exist");

    // Now let's test the actual player props data
    // Wait for the player props data to load
    cy.get('[data-cy="playerprop-container"]', { timeout: 3000 }).should(
      "be.visible"
    );

    // Wait for the player props items to appear
    cy.get('[data-cy="player-props-item"]', { timeout: 3000 })
      .first()
      .should("be.visible");

    // Test that we have actual player props data
    cy.get('[data-cy="player-props-item"]')
      .first()
      .children('[data-cy="player-name"]')
      .should("exist");
    cy.get('[data-cy="player-props-odds-item"]').first().should("exist");
    cy.get('[data-cy="odds-price"]').first().should("exist");
    cy.get('[data-cy="odds-point"]').first().should("exist");
    cy.get('[data-cy="odds-book"]').first().should("exist");

    cy.log("Player props test passed with real MLB data!");
  });
});

describe("Mini Nav", () => {
  it('should navigate to the MMA moneyline page when clicking on the "MMA" link', () => {
    cy.visit("/");

    // The MiniNav component has MMA as the second item (index 1)
    cy.get('nav[aria-label="Popular sports"] a').eq(1).click({ force: true });

    cy.location("pathname").should(
      "eq",
      "/odds/mma_mixed_martial_arts/moneyline"
    );

    //cy.title().should("eq", "MMA Moneyline Odds"); // TODO: start adding page titles.

    cy.get("h1").should("contain", "MMA MIXED MARTIAL ARTS");
  });
});
