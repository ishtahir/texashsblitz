import React from 'react';

const StateAppearanceView = props => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="4" className="table-header">
            State Championship Appearances
          </th>
        </tr>
        <tr>
          <th>School</th>
          <th>Appearances</th>
          <th>Years</th>
        </tr>
      </thead>
      <tbody>
        {props.teams.map((team, i) => {
          return (
            <tr key={`${team}${i}`} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school">{team.city ? `${team.city} ${team.school} ${team.mascot}` : `${team.school} ${team.mascot}`}</td>
              <td className="appearances num">{team.stateAppearances.length}</td>
              <td className="years">{team.stateAppearances.sort((a, b) => a - b).join(', ')}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StateAppearanceView;
