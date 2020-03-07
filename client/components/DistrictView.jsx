import React from 'react';
import District from './District';

const DistrictView = ({ currentClass, districts, teams, isDesktop, currentDivision }) => {
  return currentClass > 6 ? (
    <p className="text-desc change">Please change to a specific classification to see teams</p>
  ) : (
    districts.map(district => (
      <District
        key={`dist${district}`}
        district={district}
        teams={teams.filter(team => team.district === district)}
        isDesktop={isDesktop}
        currentClass={currentClass}
        currentDivision={currentDivision}
      />
    ))
  );
};

export default DistrictView;
