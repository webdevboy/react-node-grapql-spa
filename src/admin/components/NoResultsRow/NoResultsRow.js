import React, { Component } from 'react';

const NoResultsRow = ({ cols }) => (
  <tr>
    <td colSpan={cols}>
      <div className="pt-non-ideal-state">
        <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
          <span className="pt-icon pt-icon-search"></span>
        </div>
        <h4 className="pt-non-ideal-state-title">No results found!</h4>
      </div>
    </td>
  </tr>
  
)

export default NoResultsRow