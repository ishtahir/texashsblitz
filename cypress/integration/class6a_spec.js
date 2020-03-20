/********************
 * C L A S S    6 A *
 *******************/

let currentClass = '6A';

describe('Main App Tests', () => {
  it('Main page loads with no errors', () => {
    cy.visit('/');
  });
});

describe(`Class ${currentClass} Tests`, () => {
  // CLASSES VIEW
  describe(`Classes view`, () => {
    it(`Should have 245 total ${currentClass} teams`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 245);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Classes view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Should find 20 Eagles in class ${currentClass}`, () => {
      cy.get('.search').type('eagles');
      cy.get('tbody')
        .children()
        .should('have.length', 20);
      cy.get('.clear-search').click();
    });

    it(`Should find 5 Klein schools in class ${currentClass}`, () => {
      cy.get('.search').type('klein');
      cy.get('tbody')
        .children()
        .should('have.length', 5);
      cy.get('.clear-search').click();
    });
  });

  // DISTRICTS VIEW
  describe(`Districts View`, () => {
    it(`Loads Districts page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
    });

    it(`Loads all 32 districts for class ${currentClass}`, () => {
      cy.get('table').should('have.length', 32);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Districts view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Loads all 21 teams with Houston in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('houston');
      cy.get('table').then(res => {
        const arr = [...res];
        const total = arr.reduce((acc, table) => acc + table.tBodies[0].rows.length, 0);
        cy.get('.total-number').contains(`${total}`);
      });
      cy.get('.clear-search').click();
    });

    it(`Loads all 7 districts of teams with Houston in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('houston');
      cy.get('table').should('have.length', 7);
      cy.get('.clear-search').click();
    });
  });

  // ENROLLMENT VIEW
  describe(`Enrollment View`, () => {
    it(`Loads Enrollment page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Districts view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Shows Allen Eagles as the highest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .first()
        .contains('Allen Eagles');
    });

    it(`Shows South Garland Colonels as the lowest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .last()
        .contains('South Garland Colonels');
    });
  });

  // STATE APPEARANCES VIEW
  describe(`State Appearances View`, () => {
    it(`Loads State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
    });

    it(`Shows all 82 teams with a State Title Appearance in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 82);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} for State Appearances view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Loads Classes page after State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });

    it(`Should have 245 teams for Class ${currentClass} after switching back to Classes view`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 245);
    });
  });

  // ONE SEARCH
  describe(`One search all the way through in class ${currentClass}`, () => {
    it('Should search for Panthers', () => {
      cy.get('.search').type('Panthers');
    });

    it('Should show 14 total Panthers in Classes view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it('Should show 12 districts containing Panthers in Districts view', () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
      cy.get('table').should('have.length', 12);
    });

    it('Should show Plano East Panthers first in Enrollment view', () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
      cy.get('tbody')
        .first()
        .contains('Plano East Panthers');
    });

    it('Should show Keller Fossil Ridge Panthers last in Enrollment view', () => {
      cy.get('tbody')
        .last()
        .contains('Keller Fossil Ridge Panthers');
    });

    it('Should show 4 Panthers in State Appearances view', () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
      cy.get('.clear-search').click();
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });
  });
});
