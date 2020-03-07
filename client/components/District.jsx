import React from 'react';

const District = ({ currentClass, currentDivision, district, teams, isDesktop }) => {
  let header = currentClass < 6 ? `Class ${currentClass}A D${currentDivision} District ${district}` : `Class ${currentClass}A District ${district}`;
  return teams.length > 0 ? (
    <table>
      <thead>
        <tr>
          <th colSpan="3" className="table-header">
            {header}
          </th>
        </tr>
        <tr>
          <th>School</th>
          <th>Mascot</th>
          <th style={{ display: `${isDesktop ? 'table-cell' : 'none'}` }}>Enrollment</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, i) => {
          return (
            <tr key={`${team}${i}`} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school">{team.city ? `${team.city} ${team.school}` : `${team.school}`}</td>
              <td className="mascot">{team.mascot}</td>
              <td className="enroll" style={{ display: `${isDesktop ? 'table-cell' : 'none'}` }}>
                {team.enrollment}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
};

export default District;
