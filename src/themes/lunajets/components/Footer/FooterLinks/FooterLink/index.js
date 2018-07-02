import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from 'uuidv4';
import cx from "classnames";
import s from "./FooterLink.scss";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { injectIntl } from "react-intl";
import TiDelete from "react-icons/lib/ti/delete";
import TiPlus from "react-icons/lib/ti/plus";
import { Toaster, Position, Intent } from "@blueprintjs/core";
import Action from "admin/components/Action";
import Text from "../../../Primitives/Text";
import Link from "../../../Primitives/Link";

class FooterLink extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            message: this.props.post && this.props.post.meta.footer ? this.props.post.meta.footer.title : '',
            links: this.props.post && this.props.post.meta.footer ? this.props.post.meta.footer.content.map(c=>c) : [],            
        };
    }

    componentWillMount() {
        // console.log(this.props, this.state);
    }

    componentDidMount() {        
    }

    componentDidUpdate(prevProps, prevState) {}    

    addLink = (e) => {        
        this.state.links.push({id: uuid(), label: 'New Link', url: null});
        this.setState({links: this.state.links})
    }

    removeLink = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        this.state.links.splice(index,1);
        this.setState({links: this.state.links})
    }

    render() {
        const { classnames, id, auth, currentLocale, defaultMessage, defaultLinks } = this.props;
        const { message, links } = this.state;
        return (
            <div className={cx("row")}>                
                <div className={cx("col-sm-12 col-12", s["link-wrap"])}>
                    <div className={cx(s["link-title"])}>
                        <Text strong={true} defaultMessage={message ? message : defaultMessage} id={id}/>
                    </div>
                    <div className={cx(s["link-list"])}>
                        {
                            links.length > 0 && 
                            <ul>
                                {
                                    links.map((l, index)=>
                                        <li key={l.id}>                                            
                                            <Link                                                 
                                                to={l.url ? l.url : '/#'}
                                                text={l.label ? l.label : ''}
                                                id={l.id}
                                                className="footer" />
                                            {/* { auth.editMode ? <TiDelete size={18} className={cx(s["remove-link"])} onClick={e=>this.removeLink(e, index)}/> : null }  */}
                                        </li>
                                    )
                                }
                            </ul>                            
                        }                        
                    </div>
                    {/* {auth.editMode ? (<a className={cx(s["add-link"])} onClick={this.addLink}><TiPlus size={18}/> Add a Link</a>) : null} */}
                    {!auth.editMode && links.length == 0 && defaultLinks }
                </div>
            </div>
        );
    }
}

const mapState = state => ({     
    auth: state.auth
});
  
export default connect(mapState)(withStyles(s)(FooterLink));
