import React from 'react';
import District from './District';

const DistrictView = props => {
  return props.districts.map(district => <District district={district} teams={props.teams.filter(team => team.district === district)} />);
};

export default DistrictView;
