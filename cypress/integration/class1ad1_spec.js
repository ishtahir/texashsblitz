/************************
 * C L A S S    1 A D 1 *
 ***********************/

const currentClass = '1A D1';
const totalEnroll = 77;

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
    it(`Should have ${totalEnroll} total ${currentClass} teams`, () => {
      cy.get('tbody').children().should('have.length', totalEnroll);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Classes view`, () => {
      cy.get('tbody')
        .children()
        .then((rows) => cy.get('.total-number').contains(`${rows.length}`));
    });

    it(`Should find 5 Hornets in class ${currentClass}`, () => {
      cy.get('.search').type('Hornets');
      cy.get('tbody').children().should('have.length', 5);
      cy.get('.clear-search').click();
    });

    it(`Should find 1 Roscoe school in class ${currentClass}`, () => {
      cy.get('.search').type('Roscoe');
      cy.get('tbody').children().should('have.length', 1);
      cy.get('.clear-search').click();
    });
  });

  // DISTRICTS VIEW
  describe(`Districts View`, () => {
    it(`Loads Districts page for class ${currentClass}`, () => {
      cy.get('.nav-items').contains('Districts').click();
    });

    it(`Loads all 16 districts for class ${currentClass}`, () => {
      cy.get('table').should('have.length', 16);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Districts view`, () => {
      cy.get('tbody')
        .children()
        .then((rows) => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Loads the 1 team with Turkey in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('Turkey');
      cy.get('table').then((res) => {
        const arr = [...res];
        const total = arr.reduce((acc, table) => acc + table.tBodies[0].rows.length, 0);
        cy.get('.total-number').contains(`${total}`);
      });

      cy.get('.clear-search').click();
    });

    it(`Loads the 1 district of teams with Turkey in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('Turkey');
      cy.get('table').should('have.length', 1);
      cy.get('.clear-search').click();
    });
  });

  // ENROLLMENT VIEW
  describe(`Enrollment View`, () => {
    it(`Loads Enrollment page for class ${currentClass}`, () => {
      cy.get('.nav-items').contains('Enrollment').click();
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Districts view`, () => {
      cy.get('tbody')
        .children()
        .then((rows) => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Shows Fruitvale Bobcats as the highest enrollment in class ${currentClass}`, () => {
      cy.get('tbody').children().first().contains('Fruitvale Bobcats');
    });

    it(`Shows Zephyr Bulldogs as the lowest enrollment in class ${currentClass}`, () => {
      cy.get('tbody').children().last().contains('Zephyr Bulldogs');
    });
  });

  // STATE APPEARANCES VIEW
  describe(`State Appearances View`, () => {
    it(`Loads State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items').contains('State Appearances').click();
    });

    it(`Shows all 51 teams with a State Title Appearance in class ${currentClass}`, () => {
      cy.get('tbody').children().should('have.length', 51);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} for State Appearances view`, () => {
      cy.get('tbody')
        .children()
        .then((rows) => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Loads Classes page after State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items').contains('Classes').click();
    });

    it(`Should have ${totalEnroll} teams for Class ${currentClass} after switching back to Classes view`, () => {
      cy.get('tbody').children().should('have.length', totalEnroll);
    });
  });

  // ONE SEARCH
  describe(`One search all the way through in class ${currentClass}`, () => {
    it('Should search for Wildcats', () => {
      cy.get('.search').type('Wildcats');
    });

    it('Should show 6 total Wildcats in Classes view', () => {
      cy.get('tbody').children().should('have.length', 6);
    });

    it('Should show 6 districts containing Wildcats in Districts view', () => {
      cy.get('.nav-items').contains('Districts').click();
      cy.get('table').should('have.length', 6);
    });

    it('Should show Water Valley Wildcats first in Enrollment view', () => {
      cy.get('.nav-items').contains('Enrollment').click();
      cy.get('tbody').first().contains('Water Valley Wildcats');
    });

    it('Should show Lenorah Grady Wildcats last in Enrollment view', () => {
      cy.get('tbody').last().contains('Lenorah Grady Wildcats');
    });

    it('Should show 2 Bulldogs in State Appearances view', () => {
      cy.get('.nav-items').contains('State Appearances').click();
      cy.get('tbody').children().should('have.length', 2);
      cy.get('.clear-search').click();
      cy.get('.nav-items').contains('Classes').click();
    });
  });
});
