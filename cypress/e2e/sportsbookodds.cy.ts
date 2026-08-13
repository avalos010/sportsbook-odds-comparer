import { getBarLineGameUrl } from "../../lib/barLine";

const sports = [
  {
    key: "mma_mixed_martial_arts",
    group: "Fighting",
    title: "MMA",
    description: "MMA",
    active: true,
    has_outrights: false,
  },
  {
    key: "boxing_boxing",
    group: "Fighting",
    title: "Boxing",
    description: "Boxing",
    active: true,
    has_outrights: false,
  },
  {
    key: "basketball_nba",
    group: "Basketball",
    title: "NBA",
    description: "NBA",
    active: true,
    has_outrights: false,
  },
  {
    key: "baseball_mlb",
    group: "Baseball",
    title: "MLB",
    description: "MLB",
    active: true,
    has_outrights: false,
  },
  {
    key: "americanfootball_nfl",
    group: "Football",
    title: "NFL",
    description: "NFL",
    active: true,
    has_outrights: false,
  },
  {
    key: "icehockey_nhl",
    group: "Hockey",
    title: "NHL",
    description: "NHL",
    active: true,
    has_outrights: false,
  },
];

function visitApp(path = "/about") {
  cy.intercept("GET", "/api/sports", { body: sports }).as("getSports");
  cy.visit(path);
  cy.wait("@getSports").its("response.statusCode").should("equal", 200);
}

function waitForClientEffects() {
  cy.window().then(
    (win) =>
      new Cypress.Promise<void>((resolve) => {
        win.requestAnimationFrame(() => {
          win.requestAnimationFrame(() => resolve());
        });
      })
  );
}

describe("Application shell", () => {
  beforeEach(() => {
    visitApp();
  });

  it("renders the primary content and navigation landmarks", () => {
    cy.get('a[href="#main"]').should("contain.text", "Skip to main content");
    cy.get('nav[aria-label="Primary"]').should("be.visible");
    cy.get('nav[aria-label="Popular sports"]').should("be.visible");
    cy.get("main#main").find("h1").should("have.text", "About");
  });

  it("opens and closes the league menu without forced clicks", () => {
    cy.get('button[aria-label="Open menu"]')
      .should("have.attr", "aria-expanded", "false")
      .click()
      .should("have.attr", "aria-expanded", "true");

    cy.get('aside[aria-label="Main menu"]')
      .should("be.visible")
      .within(() => {
        cy.contains("h2", "Leagues").should("be.visible");
        cy.get("a").should("have.length", sports.length);
      });

    cy.get('button[aria-label="Close menu"]').click();
    cy.get('aside[aria-label="Main menu"]').should("not.exist");
  });

  it("navigates to a league from the menu", () => {
    cy.get('button[aria-label="Open menu"]').click();
    cy.contains('aside[aria-label="Main menu"] a', "MMA")
      .should(
        "have.attr",
        "href",
        "/odds/mma_mixed_martial_arts/moneyline"
      )
      .click();

    cy.location("pathname").should(
      "equal",
      "/odds/mma_mixed_martial_arts/moneyline"
    );
    cy.get('aside[aria-label="Main menu"]').should("not.exist");
  });

  it("exposes stable quick-access league links", () => {
    const expectedLinks = {
      Upcoming: "/",
      MMA: "/odds/mma_mixed_martial_arts/moneyline",
      Boxing: "/odds/boxing_boxing/moneyline",
      NBA: "/odds/basketball_nba/moneyline",
      MLB: "/odds/baseball_mlb/moneyline",
      NHL: "/odds/icehockey_nhl/moneyline",
    };

    cy.get('nav[aria-label="Popular sports"]').within(() => {
      Object.entries(expectedLinks).forEach(([label, href]) => {
        cy.contains("a", label).should("have.attr", "href", href);
      });
    });
  });
});

describe("BarLine game links", () => {
  const cases = [
    {
      league: "MLB",
      sportKey: "baseball_mlb",
      home: "Chicago Cubs",
      away: "St. Louis Cardinals",
      teams: "CHC,STL",
    },
    {
      league: "NBA",
      sportKey: "basketball_nba",
      home: "Los Angeles Lakers",
      away: "Boston Celtics",
      teams: "LAL,BOS",
    },
    {
      league: "NFL",
      sportKey: "americanfootball_nfl",
      home: "Kansas City Chiefs",
      away: "Buffalo Bills",
      teams: "KC,BUF",
    },
    {
      league: "NHL",
      sportKey: "icehockey_nhl",
      home: "New York Rangers",
      away: "New Jersey Devils",
      teams: "NYR,NJD",
    },
  ];

  cases.forEach(({ league, sportKey, home, away, teams }) => {
    it(`builds a game-filtered ${league} props URL`, () => {
      const url = getBarLineGameUrl(sportKey, home, away);

      expect(url).to.equal(
        `https://player-props-dashboard.vercel.app/props-table?sport=${league}&team=${teams}`
      );
    });
  });

  it("does not create an unfiltered link for unsupported data", () => {
    expect(
      getBarLineGameUrl("soccer_epl", "Arsenal", "Liverpool")
    ).to.equal(null);
    expect(
      getBarLineGameUrl("basketball_nba", "Unknown Team", "Boston Celtics")
    ).to.equal(null);
  });
});

describe("Saved interface preferences", () => {
  it("remembers when the BarLine promotion is dismissed", () => {
    visitApp();

    cy.get('aside[aria-label="BarLine promotion"]').should("be.visible");
    cy.get('button[aria-label="Dismiss BarLine promotion"]').click();
    cy.get('aside[aria-label="BarLine promotion"]').should("not.exist");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "barline-promo-dismissed")
      .should("equal", "true");

    cy.reload();
    cy.wait("@getSports");
    waitForClientEffects();
    cy.get('aside[aria-label="BarLine promotion"]').should("not.exist");
  });

  it("persists the selected color theme", () => {
    cy.intercept("GET", "/api/sports", { body: sports }).as("getSports");
    cy.visit("/about", {
      onBeforeLoad(win) {
        win.localStorage.setItem("theme", "light");
      },
    });
    cy.wait("@getSports");

    cy.get('button[aria-label="Toggle dark mode"]')
      .should("have.attr", "aria-pressed", "false")
      .click()
      .should("have.attr", "aria-pressed", "true");
    cy.get("html").should("have.class", "dark");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "theme")
      .should("equal", "dark");

    cy.reload();
    cy.wait("@getSports");
    waitForClientEffects();
    cy.get("html").should("have.class", "dark");
    cy.get('button[aria-label="Toggle dark mode"]').should(
      "have.attr",
      "aria-pressed",
      "true"
    );
  });
});
