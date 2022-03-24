describe("Initial page load", () => {
  beforeEach(() => {
    cy.visit("https://predictions.ikenley.com/");
  });

  it("Displays a header by default", () => {
    cy.get(".jumbotron .display-5").should("have.length", 1);
    cy.get(".jumbotron .display-5").should("have.text", "Predictions");
  });
});
