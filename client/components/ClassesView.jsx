import React from 'react';

const ClassesView = props => {
  let header = `${props.currentClass}A Classification (${'A'.repeat(props.currentClass)})`;
  let headerAll = 'All Teams (All Classifications)';
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="3" className="table-header">
            {props.currentClass > 6 ? headerAll : props.currentClass === 6 ? header : `${header} D${props.currentDivision}`}
          </th>
        </tr>
        <tr>
          <th>{props.currentClass > 6 ? 'School/Mascot' : 'School'}</th>
          <th style={{ display: props.currentClass > 6 ? 'none' : 'table-cell' }}>Mascot</th>
          <th style={{ display: `${props.isDesktop || props.currentClass > 6 ? 'table-cell' : 'none'}` }}>
            {props.currentClass > 6 ? 'Class' : 'Enrollment'}
          </th>
        </tr>
      </thead>
      <tbody>
        {props.teams.map((team, i) => {
          return (
            <tr key={i} style={{ background: team.colors[0], color: team.colors[1] }}>
              <td className="school">
                {props.currentClass > 6
                  ? team.city
                    ? `${team.city} ${team.school} ${team.mascot}`
                    : `${team.school} ${team.mascot}`
                  : `${team.school}`}
              </td>
              <td className="mascot" style={{ display: props.currentClass > 6 ? 'none' : 'table-cell' }}>
                {team.mascot}
              </td>
              {props.currentClass > 6 ? (
                <td className="class-all" style={{ display: `${props.isDesktop || props.currentClass > 6 ? 'table-cell' : 'none'}` }}>
                  {team.class === 6 ? `${team.class}A` : `${team.class}A D${team.division}`}
                </td>
              ) : (
                <td className="enroll" style={{ display: `${props.isDesktop ? 'table-cell' : 'none'}` }}>
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
