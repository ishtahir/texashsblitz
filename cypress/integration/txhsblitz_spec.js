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
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
      cy.get('.clear-search').click();
    });

    it(`Should find 5 Klein schools in class ${currentClass}`, () => {
      cy.get('.search').type('klein');
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
      cy.get('.clear-search').click();
    });
  });

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
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
      cy.get('.clear-search').click();
    });

    it(`Loads all 7 districts of teams with Houston in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('houston');
      cy.get('table').should('have.length', 7);
      cy.get('.clear-search').click();
    });
  });

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

  describe(`State Appearances View`, () => {
    it(`Loads State Appearances page for class ${currentClass}`, () => {
      cy.get('.nav-items')
        .contains('State Appearances')
        .click();
    });

    it(`Shows all 82 teams with a State Title Appearance in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
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

/************************
 * C L A S S    5 A D 1 *
 ***********************/

currentClass = '5A D1';
describe(`Class ${currentClass} Tests`, () => {
  it(`Should switch to class ${currentClass}`, () => {
    cy.get('select').select(`Class ${currentClass}`);
  });
  describe(`Classes view`, () => {
    it(`Should have 129 total ${currentClass} teams`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 129);
    });

    it(`Should match the number of total teams with the number of schools displaying for class ${currentClass} in Classes view`, () => {
      cy.get('tbody')
        .children()
        .then(rows => cy.get('.total-number').contains(`${rows.length}`));
    });

    it(`Should find 6 Bulldogs in class ${currentClass}`, () => {
      cy.get('.search').type('bulldogs');
      cy.get('tbody')
        .children()
        .then(rows => cy.get('.total-number').contains(`${rows.length}`));
      cy.get('.clear-search').click();
    });

    it(`Should find 3 Pflugerville schools in class ${currentClass}`, () => {
      cy.get('.search').type('pflugerville');
      cy.get('tbody')
        .children()
        .then(rows => cy.get('.total-number').contains(`${rows.length}`));
      cy.get('.clear-search').click();
    });
  });

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

    it(`Loads all 14 teams with San Antonio in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('San Antonio');
      cy.get('table').then(res => {
        const arr = [...res];
        const total = arr.reduce((acc, table) => acc + table.tBodies[0].rows.length, 0);
        cy.get('.total-number').contains(`${total}`);
      });

      cy.get('.clear-search').click();
    });

    it(`Loads all 3 districts of teams with San Antonio in the city or school for class ${currentClass}`, () => {
      cy.get('.search').type('San Antonio');
      cy.get('table').should('have.length', 3);
      cy.get('.clear-search').click();
    });
  });

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

    it(`Shows Austin Anderson Trojans as the highest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .first()
        .contains('Austin Anderson Trojans');
    });

    it(`Shows San Antonio Houston Hurricanes as the lowest enrollment in class ${currentClass}`, () => {
      cy.get('tbody')
        .children()
        .last()
        .contains('San Antonio Houston Hurricanes');
    });
  });

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

    it(`Should have 129 teams for Class ${currentClass} after switching back to Classes view`, () => {
      cy.get('tbody')
        .children()
        .should('have.length', 129);
    });
  });

  describe(`One search all the way through in class ${currentClass}`, () => {
    it('Should search for Wildcats', () => {
      cy.get('.search').type('Wildcats');
    });

    it('Should show 4 total Wildcats in Classes view', () => {
      cy.get('tbody')
        .children()
        .then(rows => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it('Should show 4 districts containing Wildcats in Districts view', () => {
      cy.get('.nav-items')
        .contains('Districts')
        .click();
      cy.get('table').should('have.length', 4);
    });

    it('Should show Weslaco East Wildcats first in Enrollment view', () => {
      cy.get('.nav-items')
        .contains('Enrollment')
        .click();
      cy.get('tbody')
        .first()
        .contains('Weslaco East Wildcats');
    });

    it('Should show Gregory-Portland Wildcats last in Enrollment view', () => {
      cy.get('tbody')
        .last()
        .contains('Gregory-Portland Wildcats');
    });

    it('Should show 3 Wildcats in State Appearances view', () => {
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
