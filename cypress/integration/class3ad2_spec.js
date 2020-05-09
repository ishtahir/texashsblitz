/************************
 * C L A S S    3 A D 2 *
 ***********************/

let currentClass = '3A D2';

describe('Main App Tests', () => {
  it('Main page loads with no errors', () => {
    cy.visit('/');
  });
});

describe(`Class ${currentClass} Tests`, () => {
  it(`Should switch to class ${currentClass}`, () => {
    cy.get('select').select(`Class ${currentClass}`);
  });

  // CLASSES VIEW
  describe(`Classes view`, () => {
    it(`Should have 105 total ${currentClass} teams`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 105);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Classes view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => cy.get('.total-number').contains(`${rows.length}`));
    });

    it(`Should find 4 Hornets in class ${currentClass}`, () => {
      cy.get('.search').type('Hornets');
      cy.get('tbody')
        .children()
        .should('have.length', 4);
      cy.get('.clear-search').click();
    });

    it(`Should find 1 Taft schools in class ${currentClass}`, () => {
      cy.get('.search').type('Taft');
      cy.get('tbody')
        .children()
        .should('have.length', 1);
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

    it(`Loads all 16 districts for class ${currentClass}`, () => {
      cy.get('table').should('have.length', 16);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Districts view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Loads the 1 team with Taft in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('Taft');
      cy.get('table').then(res => {
        const arr = [...res];
        const total = arr.reduce((acc, table) => acc + table.tBodies[0].rows.length, 0);
        cy.get('.total-number').contains(`${total}`);
      });

      cy.get('.clear-search').click();
    });

    it(`Loads the 1 district of teams with Taft in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('Taft');
      cy.get('table').should('have.length', 1);
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

    it(`Shows Florence Buffaloes as the highest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .first()
        .contains('Florence Buffaloes');
    });

    it(`Shows Dallas Gateway Charter Academy Gators as the lowest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .last()
        .contains('Dallas Gateway Charter Academy Gators');
    });
  });

  // STATE APPEARANCES VIEW
  describe(`State Appearances View`, () => {
    it(`Loads State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
    });

    it(`Shows all 71 teams with a State Title Appearance in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 71);
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

    it(`Should have 105 teams for Class ${currentClass} after switching back to Classes view`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 105);
    });
  });

  // ONE SEARCH
  describe(`One search all the way through in class ${currentClass}`, () => {
    it('Should search for Eagles', () => {
      cy.get('.search').type('Eagles');
    });

    it('Should show 10 total Eagles in Classes view', () => {
      cy.get('tbody')
        .children()
        .should('have.length', 10);
    });

    it('Should show 8 districts containing Eagles in Districts view', () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
      cy.get('table').should('have.length', 8);
    });

    it('Should show Diana New Diana Eagles first in Enrollment view', () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
      cy.get('tbody')
        .first()
        .contains('Diana New Diana Eagles');
    });

    it('Should show Valley View Eagles last in Enrollment view', () => {
      cy.get('tbody')
        .last()
        .contains('Valley View Eagles');
    });

    it('Should show 9 Eagles in State Appearances view', () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
      cy.get('tbody')
        .children()
        .should('have.length', 9);
      cy.get('.clear-search').click();
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });
  });
});
