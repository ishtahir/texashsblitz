import React from 'react';

const Teams6A = props => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="4" className="table-header">
            6A Classification (AAAAAA)
          </th>
        </tr>
        <tr>
          <th className="school">School</th>
          <th className="mascot">Mascot</th>
          <th className="district">District</th>
          <th className="enrollment">Enroll</th>
        </tr>
      </thead>
      <tbody>
        {props.teams.map((team, i) => {
          return (
            <tr key={i} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school">{team.city ? `${team.city} ${team.school}` : `${team.school}`}</td>
              <td className="mascot">{team.mascot}</td>
              <td className="district num">{team.district}</td>
              <td className="enrollment num">{team.enrollment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Teams6A;
