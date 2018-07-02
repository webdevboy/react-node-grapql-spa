import React from "react";
import PropTypes from 'prop-types';
import { FormattedDate } from "react-intl";
import cx from "classnames";
import s from "./AdvisorDetail.scss";
import Image from "../../../Primitives/Image";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Text from "../../../Primitives/Text";
import Smartphone from "react-feather/dist/icons/smartphone";
import Phone from "react-feather/dist/icons/phone";
import Mail from "react-feather/dist/icons/mail";

class AdvisorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {        
        const { img, title, name, meta } = this.props;
        
        return (
            <div>
                <Text defaultMessage={title} className={cx("dk-blue", s.sectionTitle)} id="client.lunajets.dashboard.advisor" />            
                <div className={cx("row mt-3")}>
                    <div className={cx("col-5")}>
                        <Image
                            className={cx("center-block rounded-circle")}
                            source={img}
                            alt="test"
                            title="test"
                            width="90%"
                            maxWidth="100px"
                        />
                    </div>
                    <div className={cx("col-7 text-left", s.advisor)}>
                        <Text defaultMessage={name} className={cx("dk-blue")} id="client.lunajets.dashboard.advisor" />
                        {
                            meta.mobile ? 
                            <div className="d-flex align-items-center mt-2">
                                <Smartphone className="mr-2" color="#ef4343" size="15" />
                                <div className={s["advisor-detail"]}>
                                    <span className="dk-blue">{meta.mobile}</span>
                                </div>
                            </div> : null
                        }
                        {
                            meta.phone ? 
                            <div className="d-flex align-items-center">
                                <Phone className="mr-2" color="#ef4343" size="15" />
                                <div className={s["advisor-detail"]}>
                                    <span className="dk-blue">{meta.phone}</span>
                                </div>
                            </div> : null
                        }
                        {
                            meta.email ? <div className="d-flex align-items-center">
                                <Mail className="mr-2" color="#ef4343" size="15" />
                                <div className={s["advisor-detail"]}>
                                    <span className="dk-blue">{meta.email}</span>
                                </div>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

AdvisorDetail.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,    
    meta: PropTypes.object
}

AdvisorDetail.defaultProps = {       
    img: "https://www.lunajets.com/photo.php?photoId=3080&h=180&w=180&sysver=3.15.2.prod",
    title: "My private aviation advisor",
    name: "Manuel Hubschmann",
    meta: {
        email: 'manuel@lunajets.com',
        mobile: '+123 789 345 567',
        phone: '+123 789 345 567',
    }    
}

export default withStyles(s)(AdvisorDetail);
