import React from 'react';

const District = props => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3" className="table-header">
            Class 6A District {props.district}
          </th>
        </tr>
        <tr>
          <th>School</th>
          <th>Mascot</th>
          <th>Enrollment</th>
        </tr>
      </thead>
      <tbody>
        {props.teams.map((team, i) => {
          return (
            <tr key={`${team}${i}`} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school">{team.city ? `${team.city} ${team.school}` : `${team.school}`}</td>
              <td className="mascot">{team.mascot}</td>
              <td className="enrollment num">{team.enrollment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default District;
