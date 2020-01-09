import React from 'react';

const Teams6A = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>School</th>
          <th>Mascot</th>
          <th>Class</th>
          <th>District</th>
          <th>Enrollment</th>
        </tr>
      </thead>
      <tbody>
        {props.teams.map((team, i) => {
          return (
            <tr key={i}>
              <td>{team.city ? `${team.city} ${team.school}` : `${team.school}`}</td>
              <td>{team.mascot}</td>
              <td>{team.class}</td>
              <td>{team.district}</td>
              <td>{team.enrollment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Teams6A;
