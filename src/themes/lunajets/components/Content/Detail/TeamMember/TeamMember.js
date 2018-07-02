import React from "react";
import PropTypes from 'prop-types';
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./TeamMember.scss";
import Image from "../../../Primitives/Image";
import withStyles from "isomorphic-style-loader/lib/withStyles";

// import emptyLegs from "./gfx/jet_cost_empty_legs.png";

class TeamMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState) {}

    render() {        
        const { id, title, meta, isManagement } = this.props;
        
        return (
            <section className={s["team-member"]}>            
                <div className={cx("text-center")}>
                    <Image
                        className={cx("center-block", "rounded-circle")}
                        source={meta.image}
                        alt={meta.first_name + ' ' + meta.last_name + ' ' + title + ' at Lunajet' }
                        title={meta.first_name + ' ' +  meta.last_name + '-' + title + '-' + meta.image}
                        width="90%"
                        maxWidth="120px"
                    />
                </div>
                <div className={cx("text-center")}>
                    <strong>{meta.first_name + ' ' + meta.last_name}</strong>
                </div>
                <div className={cx("text-center")}>
                    {title}
                </div>
                <div className={cx("row")}>
                    <div className={cx("col-md-12 text-center")}>
                    { 
                        meta.flags.map((flag, index) => (
                            <i className={cx("famfamfam-flags mx-2", flag)}></i>
                        ))
                    }
                    </div>                    
                </div>                
                {
                    isManagement && meta.bio && 
                    <div>
                        {meta.bio}
                    </div>
                }
            </section>
        );
    }
}

TeamMember.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,    
    meta: PropTypes.object    

}

TeamMember.defaultProps = {       
    id: "bd3a2f3c-eca8-4334-a902-a1e6565e03e5",
    title: "Jose Ferreiro",
    slug: "jose-ferreiro",
    meta:{
        first_name: "Jose",
        last_name: "Ferreiro",
        bio: "lorem ipsum dolor sit amet ...",
        flags: [
            "es",
            "gb",
            "fr",
            "pt"
        ],
        image: "https://www.lunajets.com/photo.php?photoId=3080&h=180&w=180&sysver=3.15.2.prod",
        order: 0,
        visible: true
    }    
}

export default withStyles(s)(TeamMember);
