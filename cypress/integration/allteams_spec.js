/**********************
 * A L L    T E A M S *
 *********************/

const currentClass = 'All Teams';
const totalEnroll = 1237;

describe('Main App Tests', () => {
  it('Main page loads with no errors', () => {
    cy.visit('/');
  });
});

describe(`${currentClass} Tests`, () => {
  // CLASSES VIEW
  describe(`Classes view`, () => {
    it(`Should have ${totalEnroll} total ${currentClass} teams`, () => {
      cy.get('tbody').children().should('have.length', totalEnroll);
    });

    it(`Should match the number of total teams with the number of schools displaying for ${currentClass} in Classes view`, () => {
      cy.get('tbody')
        .children()
        .then((rows) => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    it(`Should find 12 Jaguars in ${currentClass}`, () => {
      cy.get('.search').type('Jaguars');
      cy.get('tbody').children().should('have.length', 12);
      cy.get('.clear-search').click();
    });

    it(`Should find 27 San Antonio schools in ${currentClass}`, () => {
      cy.get('.search').type('San Antonio');
      cy.get('tbody').children().should('have.length', 27);
      cy.get('.clear-search').click();
    });
  });

  //   // DISTRICTS VIEW
  describe(`Districts View`, () => {
    it(`Loads Districts page for ${currentClass}`, () => {
      cy.get('.nav-items').contains('Districts').click();
    });

    it(`Loads 0 districts for ${currentClass}`, () => {
      cy.get('table').should('have.length', 0);
    });

    it(`Should match the number of total teams with the number of schools displaying for ${currentClass} in Districts view`, () => {
      cy.get('tbody')
        .children()
        .then((rows) => {
          cy.get('.total-number').contains(`${rows.length}`);
        });
    });

    //   // ENROLLMENT VIEW
    describe(`Enrollment View`, () => {
      it(`Loads Enrollment page for ${currentClass}`, () => {
        cy.get('.nav-items').contains('Enrollment').click();
      });

      it(`Should match the number of total teams with the number of schools displaying for ${currentClass} in Districts view`, () => {
        cy.get('tbody')
          .children()
          .then((rows) => {
            cy.get('.total-number').contains(`${rows.length}`);
          });
      });

      it(`Shows Allen Eagles as the highest enrollment in ${currentClass}`, () => {
        cy.get('tbody').children().first().contains('Allen Eagles');
      });

      it(`Shows Valentine Pirates as the lowest enrollment in ${currentClass}`, () => {
        cy.get('tbody').children().last().contains('Valentine Pirates');
      });
    });

    //   // STATE APPEARANCES VIEW
    describe(`State Appearances View`, () => {
      it(`Loads State Appearances page for ${currentClass}`, () => {
        cy.get('.nav-items').contains('State Appearances').click();
      });

      it(`Shows all 402 teams with a State Title Appearance in ${currentClass}`, () => {
        cy.get('tbody').children().should('have.length', 402);
      });

      it(`Should match the number of total teams with the number of schools displaying for ${currentClass} for State Appearances view`, () => {
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

    //   // ONE SEARCH
    describe(`One search all the way through in class ${currentClass}`, () => {
      it('Should search for Rangers', () => {
        cy.get('.search').type('Rangers');
      });

      it('Should show 14 total Rangers in Classes view', () => {
        cy.get('tbody')
          .children()
          .then((rows) => {
            cy.get('.total-number').contains(`${rows.length}`);
          });
      });

      it('Should show 0 districts containing Rangers in Districts view', () => {
        cy.get('.nav-items').contains('Districts').click();
        cy.get('table').should('have.length', 0);
      });

      it('Should show Comal Smithson Valley Rangers first in Enrollment view', () => {
        cy.get('.nav-items').contains('Enrollment').click();
        cy.get('tbody').first().contains('Comal Smithson Valley Rangers');
      });

      it('Should show Afton Patton Springs Rangers last in Enrollment view', () => {
        cy.get('tbody').last().contains('Afton Patton Springs Rangers');
      });

      it('Should show 4 Rangers in State Appearances view', () => {
        cy.get('.nav-items').contains('State Appearances').click();
        cy.get('tbody')
          .children()
          .then((rows) => {
            cy.get('.total-number').contains(`${rows.length}`);
          });
        cy.get('.clear-search').click();
        cy.get('.nav-items').contains('Classes').click();
      });
    });
  });
});
