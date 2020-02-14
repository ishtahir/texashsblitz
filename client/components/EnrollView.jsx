import React from 'react';

const EnrollView = props => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2" className="table-header">
            Class 6A by Enrollment
          </th>
        </tr>
        <tr>
          <th>School</th>
          <th>Enrollment</th>
        </tr>
      </thead>
      <tbody>
        {props.teams.map((team, i) => {
          return (
            <tr key={i} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school-mascot">{team.city ? `${team.city} ${team.school} ${team.mascot}` : `${team.school} ${team.mascot}`}</td>
              <td className="enroll">{team.enrollment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EnrollView;
