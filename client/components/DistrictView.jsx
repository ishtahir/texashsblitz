import React from 'react';
import District from './District';

const DistrictView = props => {
  return props.currentClass > 6 ? (
    <p className="text-desc change">Please change to a specific classification to see teams</p>
  ) : (
    props.districts.map(district => (
      <District
        key={`dist${district}`}
        district={district}
        teams={props.teams.filter(team => team.district === district)}
        isDesktop={props.isDesktop}
        currentClass={props.currentClass}
        currentDivision={props.currentDivision}
      />
    ))
  );
};

export default DistrictView;
