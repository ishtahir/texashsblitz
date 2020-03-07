import React from 'react';

const ClassesView = ({ currentClass, currentDivision, isDesktop, teams }) => {
  let header = `${currentClass}A Classification (${'A'.repeat(currentClass)})`;
  let headerAll = 'All Teams (All Classifications)';
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3" className="table-header">
            {currentClass > 6 ? headerAll : currentClass === 6 ? header : `${header} D${currentDivision}`}
          </th>
        </tr>
        <tr>
          <th>School</th>
          <th style={{ display: currentClass > 6 ? 'none' : 'table-cell' }}>Mascot</th>
          <th style={{ display: `${isDesktop || currentClass > 6 ? 'table-cell' : 'none'}` }}>{currentClass > 6 ? 'Class' : 'Enrollment'}</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, i) => {
          return (
            <tr key={i} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school">
                {currentClass > 6
                  ? team.city
                    ? `${team.city} ${team.school} ${team.mascot}`
                    : `${team.school} ${team.mascot}`
                  : `${team.city} ${team.school}`}
              </td>
              <td className="mascot" style={{ display: currentClass > 6 ? 'none' : 'table-cell' }}>
                {team.mascot}
              </td>
              {currentClass > 6 ? (
                <td className="class-all" style={{ display: `${isDesktop || currentClass > 6 ? 'table-cell' : 'none'}` }}>
                  {team.class === 6 ? `${team.class}A` : `${team.class}A D${team.division}`}
                </td>
              ) : (
                <td className="enroll" style={{ display: `${isDesktop ? 'table-cell' : 'none'}` }}>
                  {team.enrollment}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ClassesView;
