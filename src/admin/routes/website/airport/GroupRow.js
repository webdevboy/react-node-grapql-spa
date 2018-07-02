import React from "react";
import moment from "moment/moment";
import Action from "admin/components/Action";
import StateTag from "admin/components/StateTag";
import { sortPostByLanguage } from "utils/sortPostByLanguage";

const GroupRow = ({
  id,
  airports,
  master,
  baseLang,
  select,
  isActive,
  editAirport,
  removeAirport,
}) => (
  <tr onClick={() => select(id, airports)} className={isActive ? "is-active" : null}>
    <td className="preview-col">
      <Action
        key="item-action-view"
        icon="pt-icon-eye-open"
        action={() => {}}
        tooltip="View Airport"
      />
    </td>
    <td className="id-col">{id}</td>
    <td>
      <div>
        <span>{master.title}</span>        
      </div>
      <div>
        {sortPostByLanguage(airports, baseLang).map((airport, index) => (
          <StateTag
            onClick={e => editAirport(e, airport.id)}
            key={`tag-locale-${airport.language_id}-${index}`}
            value={airport.state}
            text={airport.language.locale}
          />
        ))}
      </div>
    </td>
    <td>{master.iata}</td>

    <td>{master.icao}</td>

    <td>{master.city.name}</td>

    <td>{master.publish_at ? moment(master.publish_at).format("ll") : moment(master.created_at).format("ll")}</td>

    <td className="single-action-col">
      <Action
        key="item-action-remove"
        icon="pt-icon-remove"
        intent="pt-intent-danger"
        action={e => removeAirport(e, id)}
        tooltip="Remove Aircraft"
      />
    </td>
  </tr>
);

export default GroupRow;
