import React from 'react';

const EnrollView = props => {
  let header = `Class ${props.currentClass}A by Enrollment`;
  let headerAll = 'All Teams by Enrollment';
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2" className="table-header">
            {props.currentClass > 6 ? headerAll : header}
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
