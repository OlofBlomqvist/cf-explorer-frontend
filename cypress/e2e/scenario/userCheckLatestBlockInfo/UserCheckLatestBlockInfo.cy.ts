describe("User check information of latest Block", () => {
  it("User go to Blocks and click to latest Block, then verify the Block detail Screen", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-blocks"]').click();
    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get('[data-testid="table-common"]').should("be.visible");
    cy.get('[aria-label="pagination navigation"]').should("be.visible");

    cy.get('[data-testid="table-common"] tbody tr').eq(0).click();
    cy.get("a").contains("View Details", { matchCase: false }).should("be.visible");
    cy.get("a").contains("View Details", { matchCase: false }).click();

    cy.get('[data-testid="search-bar"]').should("be.visible");
    cy.get("div").contains("Block details", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Created At", { matchCase: false }).should("be.visible");
    cy.get("div").contains("Confirmation").should("be.visible");
    cy.get("div").contains("Transactions").should("be.visible");
    cy.get("div").contains("Transaction Fees", { matchCase: false }).should("be.visible");
    cy.get("div").contains(" Block").should("be.visible");
    cy.get("div").contains(" Slot").should("be.visible");
    cy.get('[data-testid="table-common"]').should("be.visible");

    cy.get('[data-testid="footer"]').scrollIntoView();
  });
});
