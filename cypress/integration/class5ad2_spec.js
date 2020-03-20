/************************
 * C L A S S    5 A D 2 *
 ***********************/

let currentClass = '5A D2';

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
    it(`Should have 122 total ${currentClass} teams`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 122);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Classes view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => cy.get('.total-number').contains(`${rows.length}`));
    });

    it(`Should find 6 Raiders in class ${currentClass}`, () => {
      cy.get('.search').type('Raiders');
      cy.get('tbody')
        .children()
        .should('have.length', 6);
      cy.get('.clear-search').click();
    });

    it(`Should find 7 Austin schools in class ${currentClass}`, () => {
      cy.get('.search').type('Austin');
      cy.get('tbody')
        .children()
        .should('have.length', 7);
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

    it(`Loads all 10 teams with El Paso in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('El Paso');
      cy.get('table').then(res => {
        const arr = [...res];
        const total = arr.reduce((acc, table) => acc + table.tBodies[0].rows.length, 0);
        cy.get('.total-number').contains(`${total}`);
      });

      cy.get('.clear-search').click();
    });

    it(`Loads all 2 districts of teams with El Paso in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('El Paso');
      cy.get('table').should('have.length', 2);
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

    it(`Shows Houston Waltrip Rams as the highest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .first()
        .contains('Houston Waltrip Rams');
    });

    it(`Shows Austin Northeast Raiders as the lowest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .last()
        .contains('Austin Northeast Raiders');
    });
  });

  // STATE APPEARANCES VIEW
  describe(`State Appearances View`, () => {
    it(`Loads State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
    });

    it(`Shows all 63 teams with a State Title Appearance in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 63);
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

    it(`Should have 122 teams for Class ${currentClass} after switching back to Classes view`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 122);
    });
  });

  // ONE SEARCH
  describe(`One search all the way through in class ${currentClass}`, () => {
    it('Should search for Bears', () => {
      cy.get('.search').type('Bears');
    });

    it('Should show 4 total Bears in Classes view', () => {
      cy.get('tbody')
        .children()
        .should('have.length', 4);
    });

    it('Should show 4 districts containing Bears in Districts view', () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
      cy.get('table').should('have.length', 4);
    });

    it('Should show Montgomery Bears first in Enrollment view', () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
      cy.get('tbody')
        .first()
        .contains('Montgomery Bears');
    });

    it('Should show Dallas South Oak Cliff Bears last in Enrollment view', () => {
      cy.get('tbody')
        .last()
        .contains('Dallas South Oak Cliff Bears');
    });

    it('Should show 0 Bears in State Appearances view', () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
      cy.get('tbody')
        .children()
        .should('have.length', 0);
      cy.get('.clear-search').click();
      cy.get('.nav-items')
        .contains('Classes')
        .click();
    });
  });
});
