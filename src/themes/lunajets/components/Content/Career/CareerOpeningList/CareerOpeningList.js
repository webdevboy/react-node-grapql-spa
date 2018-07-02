import React from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";
import s from "./CareerOpeningList.scss";


class CareerOpeningList extends React.Component {

  render() {
    const posts = this.props.corporate;
    const fixed_ticket = {
      title: "Sales Excutive/ Private Aviation Advisor",
      city: "Geneva",
      country: 'CH',
      duration: "Full-Time",
      noteTitle: "Note for pilots and flight attendants: ",
      note: "LunaJets does not operate any aircraft and we, therefore, do not hire pilots or flight attendants.",
    }    
    return (
      <div className={cx("container column my-5", s["list-container"])}>
        <h2 className={cx("section-title lt-blue")}>
          <Text defaultMessage="Current openings" id={"career-opening-list-title"} />
        </h2>
        {
          (posts && posts.length > 0) &&
          <div className={cx("px-0")}>
            <table className={cx(s["list-table"])}>
              <tbody>
              {
                posts.map((ticket, i) => 
                  (
                    <tr className={cx("row")}>
                      <td className={cx("col-sm-5 col-6", s["opening-career-title"])}>
                        <span>{ticket.title ? ticket.title : fixed_ticket.title}</span>
                      </td>
                      <td className={cx("col-sm-2 col-3", s["opening-career-pos"])}>
                        <span>{ticket.meta.location ? `${ticket.meta.location.name}, ` : `${fixed_ticket.city}, `}</span>
                        <span className={cx("uppercase")}>{ticket.meta.location ? `${ticket.meta.location.country.countryCode}` : fixed_ticket.country}</span>
                      </td>
                      <td className={cx("col-sm-2 col-3", s["opening-career-type"])}>
                        <span>{(ticket.meta.duration) ? "Full-Time" : "Part-Time"}</span>
                      </td>
                      <td className={cx("col-sm-3 col-12 px-0", s["opening-career-apply"])}>
                        <Link to={`/${ticket.slug}`} className={cx("btn-outline apply", s["btn-apply"])} >
                          <Text defaultMessage={"Apply"} id={`client.career-opening-list.apply-${i}`} />
                        </Link>
                      </td>
                    </tr>
                  )
                ) 
              }            
              </tbody>
            </table>
            <div className={cx("px-0 raw", s["career-note"])}>
              <Text strong={true} defaultMessage={fixed_ticket.noteTitle} id={"career-opening-list-note-title"}/>
              <Text defaultMessage={fixed_ticket.note} id={"career-opening-list-note"}/>
            </div>          
          </div>

        }        
        {
          (!posts || posts.length==0) &&
          <div className={cx("px-2", s["career-note"])}>
            <Text defaultMessage={"Currently no job opening available."} id={`career-opening-no`}/>
          </div>
        }
        
      </div>
    );
  }
}

export default withStyles(s)(CareerOpeningList);
