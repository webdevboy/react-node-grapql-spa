import React, { Component } from "react";
import { FormattedDate } from "react-intl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import s from "./TeamMemberList.scss";
import cx from "classnames";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import history from "core/history";
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle";
import Text from "../../../Primitives/Text";
import TeamMember from "themes/lunajets/components/Content/Detail/TeamMember";
import LoadingSpinner from "../../../Widgets/LoadingSpinner";
import _ from "lodash";
// import queryGetEventsForEvergreen from "./queryGetEventsForEvergreen.graphql";

class TeamMemberList extends Component {
    constructor(props) {
        super(props);        
    }
  
    componentWillReceiveProps(nextProps) {        
    }
    
    componentDidMount() {
        // console.log(this.props);
    }   

    render() {
        const list = this.props.list;        
        if (this.props.loading) {
            return (<LoadingSpinner />)
        }
        return (
            <div className={cx("p-5")}>
                {
                    list && list.map(item => (item.posts.length > 0) ?
                        <div className={cx("row", "mt-5")}>
                                <div className={cx("col-md-12")}>
                                    <div className={cx("row")}>
                                        <div className={cx("col-md-12")}>
                                            <SectionTitle defaultMessage={item.term.displayName} />
                                        </div>
                                    </div>
                                    <div className={cx("row")}>
                                        { item.posts.map(post=>
                                            <div className={ item.term.name == 'Management' ? cx("col-12 col-sm-4 col-md-3 pt-5 pb-5") : cx("col-6 col-sm-3 col-md-2 pt-5 pb-5")} key={post.id}>
                                                <TeamMember 
                                                    id={post.id}
                                                    title={post.title}
                                                    slug={post.slug}
                                                    meta={post.meta}
                                                    type={post.type}
                                                    isManagement={(item.term.name == 'Management')}
                                                    media={post.media}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>   
                    : null)
                }                
            </div>
        );
    }
}    

TeamMemberList.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array
}

TeamMemberList.defaultProps = {
    loading: false,
    list: [
        {
            "posts": [
                {              
                    "id": "bd3a2f3c-eca8-4334-a902-a1e6565e03e1",
                    "title": "Jose Ferreiro",
                    "slug": "jose-ferreiro",
                    "meta": {
                    "bio": "lorem ipsum dolor sit amet ...",
                    "email": "jose@lunajets.com",
                    "flags": [
                        "es",
                        "gb",
                        "fr",
                        "pt"
                    ],
                    "image": "https://www.lunajets.com/photo.php?photoId=3080&h=180&w=180&sysver=3.15.2.prod",
                    "order": 0,
                    "visible": true,
                    "last_name": "Ferreiro",
                    "first_name": "Jose"
                    },
                    "type": "team_member",
                    "media": null
                }
            ],
            "term": {
                "name": "Management"
            }
        }        
    ]  
};

export default withStyles(s)(TeamMemberList);
