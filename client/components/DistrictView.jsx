import React from 'react';
import District from './District';

const DistrictView = props => {
  return props.districts.map(district => (
    <District
      key={`dist${district}`}
      district={district}
      teams={props.teams.filter(team => team.district === district)}
      isDesktop={props.isDesktop}
    />
  ));
};

export default DistrictView;
