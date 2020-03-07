import React from 'react';

const StateAppearanceView = ({ currentClass, teams }) => {
  let header = `${currentClass}A State Championship Appearances`;
  let headerAll = 'All Teams State Championship Appearances';
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="4" className="table-header">
            {currentClass > 6 ? headerAll : header}
          </th>
        </tr>
        <tr>
          <th>School</th>
          <th>Appear.</th>
          <th>Years</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team, i) => {
          return (
            <tr key={`${team}${i}`} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school-mascot">{team.city ? `${team.city} ${team.school} ${team.mascot}` : `${team.school} ${team.mascot}`}</td>
              <td className="appearances">{team.stateAppearances.length}</td>
              <td className="years">{team.stateAppearances.sort((a, b) => a - b).join(', ')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StateAppearanceView;
