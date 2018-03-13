import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetSearch from './widgets/Search';
import WidgetSocial from './widgets/Social';
import WidgetCate from './widgets/Categories';
import WidgetArch from './widgets/Arch';
import WidgetTags from './widgets/Tags';

const Aside = ({
  search, social, categories, arch, tags,
}) => (
  <aside className="col-md-4 sidebar">
    { search && (<WidgetSearch/>)}
    { social && (<WidgetSocial/>)}
    { categories && (<WidgetCate/>)}
    { arch && (<WidgetArch/>)}
    { tags && (<WidgetTags/>)}
  </aside>
);

export default Aside;
