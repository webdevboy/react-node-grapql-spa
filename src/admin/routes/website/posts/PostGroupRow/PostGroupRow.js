import React, { Component } from "react";
import moment from "moment/moment";

import Action from "admin/components/Action";
import StateTag from "admin/components/StateTag";
import { sortPostByLanguage } from "utils/sortPostByLanguage";

class PostGroupRow extends Component {
  render() {
    const { id, aircrafts, master, baseLang, select, isActive, viewAicraft, editAircraft, removeAircraft } = this.props;
    return (
      <tr onClick={() => select(id, aircrafts)} className={isActive ? "is-active" : null}>
        <td className="preview-col">
          <Action key="item-action-view" icon="pt-icon-eye-open" action={e => viewAicraft(e, master)} tooltip="View" />
        </td>
        <td className="id-col">{id}</td>
        <td>
          <div>
            <a href="#">{master.title}</a>
          </div>
          <div>
            {sortPostByLanguage(aircrafts, baseLang).map(aircraft => (
              <StateTag
                onClick={e => editAircraft(e, aircraft.id)}
                key={`tag-locale-${aircraft.language.id}`}
                value={aircraft.state}
                text={aircraft.language.locale}
              />
            ))}
          </div>
        </td>
        <td>
          {master.taxonomies &&
            master.taxonomies.length > 0 &&
            master.taxonomies.map((tax, index) => {
              if (tax.taxonomy === "article_category") {
                if (index === 0 || master.taxonomies.length === 1) {
                  return tax.term.name;
                }
                return " | ".concat(tax.term.name);
              }
            })}
        </td>

        <td>
          {master.published_at ? moment(master.published_at).format("ll") : moment(master.created_at).format("ll")}
        </td>

        <td>
          <Action
            key="item-action-remove"
            icon={master.meta.featured ? "pt-icon-star" : "pt-icon-star-empty"}
            intent="pt-intent-primary"
            action={() => {}}
            tooltip="Toggle Featured state"
          />
        </td>

        {/* <td>{`${master.author.first_name || null} ${master.author.last_name || null}`}</td> */}
        <td className="single-action-col">
          <Action
            key="item-action-remove"
            icon="pt-icon-remove"
            intent="pt-intent-danger"
            action={e => removeAircraft(e, id)}
            tooltip="Remove"
          />
        </td>
      </tr>
    );
  }
}

export default PostGroupRow;
