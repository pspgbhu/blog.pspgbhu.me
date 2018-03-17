import React from 'react';
import Aside from '../components/Aside';
import OvlistBy from '../containers/OvlistBy';

const Categories = () => (
  <div>
    <OvlistBy by="tags" />
    <Aside
      categories
      arch
      tags
      social
    />
  </div>
);

export default Categories;
