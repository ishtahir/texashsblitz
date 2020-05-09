/************************
 * C L A S S    2 A D 1 *
 ***********************/

const currentClass = '2A D1';
const totalEnroll = 97;

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

    it(`Should find 4 Bearcats in class ${currentClass}`, () => {
      cy.get('.search').type('Bearcats');
      cy.get('tbody').children().should('have.length', 4);
      cy.get('.clear-search').click();
    });

    it(`Should find 1 Stinnett school in class ${currentClass}`, () => {
      cy.get('.search').type('Stinnett');
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

    it(`Loads the 1 team with Sandy in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('Sandy');
      cy.get('table').then((res) => {
        const arr = [...res];
        const total = arr.reduce((acc, table) => acc + table.tBodies[0].rows.length, 0);
        cy.get('.total-number').contains(`${total}`);
      });

      cy.get('.clear-search').click();
    });

    it(`Loads the 1 district of teams with Sandy in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('Sandy');
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

    it(`Shows Bloomington Bobcats as the highest enrollment in class ${currentClass}`, () => {
      cy.get('tbody').children().first().contains('Bloomington Bobcats');
    });

    it(`Shows Collinsville Pirates as the lowest enrollment in class ${currentClass}`, () => {
      cy.get('tbody').children().last().contains('Collinsville Pirates');
    });
  });

  // STATE APPEARANCES VIEW
  describe(`State Appearances View`, () => {
    it(`Loads State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items').contains('State Appearances').click();
    });

    it(`Shows all 63 teams with a State Title Appearance in class ${currentClass}`, () => {
      cy.get('tbody').children().should('have.length', 63);
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
    it('Should search for Bulldogs', () => {
      cy.get('.search').type('Bulldogs');
    });

    it('Should show 13 total Bulldogs in Classes view', () => {
      cy.get('tbody').children().should('have.length', 13);
    });

    it('Should show 10 districts containing Bulldogs in Districts view', () => {
      cy.get('.nav-items').contains('Districts').click();
      cy.get('table').should('have.length', 10);
    });

    it('Should show Cooper Bulldogs first in Enrollment view', () => {
      cy.get('.nav-items').contains('Enrollment').click();
      cy.get('tbody').first().contains('Cooper Bulldogs');
    });

    it('Should show Tahoka Bulldogs last in Enrollment view', () => {
      cy.get('tbody').last().contains('Tahoka Bulldogs');
    });

    it('Should show 8 Bulldogs in State Appearances view', () => {
      cy.get('.nav-items').contains('State Appearances').click();
      cy.get('tbody').children().should('have.length', 8);
      cy.get('.clear-search').click();
      cy.get('.nav-items').contains('Classes').click();
    });
  });
});
