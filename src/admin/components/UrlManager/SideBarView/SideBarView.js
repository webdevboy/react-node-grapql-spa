import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import cx from 'classnames';
import { createRedirection, updateRedirection } from '../../../actions/urlManager';
import MdAddCircleOultine from 'react-icons/lib/md/add-circle-outline';
import MdRemoveCircleOultine from 'react-icons/lib/md/remove-circle-outline';
import s from './SideBarView.css';


class SideBarView extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      urlto: '',
      url_from_list: [],
      description: '',
    };
    this.state = props.edit ? {} : this.initialState;
  }

  handleClickSave = () => {
    const { createRedirection, updateRedirection, hideSidebar, edit } = this.props;
    this.setState({
      error_url_to: false,
    });
    if(this.state.urlto !== ''){
      if(edit){
        updateRedirection({link: this.state.url_from_list.join(','), redirect: this.state.urlto, description: this.state.description, id: this.state.id})
      }
      else{
        createRedirection({link: this.state.url_from_list.join(','), redirect: this.state.urlto, description: this.state.description});
      }
      this.setState(this.initialState);
    }
    if(this.state.urlto === ''){
      this.setState({
        error_url_to: true,
      });
    }
  }

  handleClickClose = () => {
  }

  change = (ev) => {
    const property = ev.target.name;
    let value = ev.target.value;
    this.setState({
      error_url_to: false,
    });
    if( property == 'urlto'){
      if(!value.startsWith('/') || value == ''){
        value = value.replace(/^/, '/');
      }
    }
    this.setState({
      [property]: value
    });
  }

  componentDidMount() {
 
  }

  componentDidUpdate(prevProps, prevState) {
   
  }

  addUrlFromList = (ev) =>{
    let link = $('#redirect-from-input').val();
    if(!link.startsWith('/') || link == ''){
      link = link.replace(/^/, '/');
    }
    if( link!= ''){
      this.setState({
          url_from_list: [...this.state.url_from_list, link]
        }, () => $('#redirect-from-input').val(''))
    }
  }

  removeUrlFromList = (ev, index) => {
    this.setState({
      url_from_list: this.state.url_from_list.filter((script, i) =>  i != index)
    })
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.url && nextProps.edit){
      this.setState({id: nextProps.url.id, urlto: nextProps.url.redirect, url_from_list: nextProps.url.link.split(','), description: nextProps.url.description ? nextProps.url.description : ''});
    }else{
      this.setState(this.initialState);
    }
  }

  render() {

    const { url_from_list, error_url_to=false } = this.state;
    const { edit } = this.props;

    return (
      <div>
        <div className={s['container-header']}>
            <h3>Add new redirection</h3>
        </div>
        <div className={s['container-content']}>
          <div className={cx(s['redirections'])}><label>Redirect from{`(${url_from_list.length})`}</label>
            <div className="input-group">
              <input id='redirect-from-input' type="text" className="form-control" placeholder="Redirect from" aria-label="Redirect from"/>
              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.addUrlFromList}>
                  <MdAddCircleOultine size='18' color='#B3B3B3'/>
                </button>
              </span>
            </div>
            <ul>
              {url_from_list.map((link, index) => <li key={index}><span>{link}</span><MdRemoveCircleOultine onClick={(ev) => this.removeUrlFromList(ev, index)} className={s['remove-icn']} size='18' color='#B3B3B3'/></li>)}
            </ul>
          </div> 
          <div className={cx(s['entry'],'input-group')}>
            <label>Redirect to:</label><input name='urlto' value={this.state.urlto} className={cx('form-control', error_url_to ? s['error'] : '')}  type='text' placeholder='Enter url to' onChange={this.change}/>
            { error_url_to ? <div><label className={s['label-error']}>Url not valid</label></div> : ''}
          </div>
          <div className={cx(s['entry'],'input-group')}>
            <label>Description:</label><textarea name='description' value={this.state.description} className={cx('form-control')} onChange={this.change}/>
          </div>
        </div>
        <div className={s['container-action']}>  
          <button className={cx('btn', 'btn-secondary')} onClick={this.handleClickSave}>{edit ? 'Update redirection' : 'Add redirection'}</button>
          <button className={cx('btn', 'btn-primary')} onClick={this.handleClickClose}>Cancel</button>
        </div> 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  urls: state.redirections,
});

const mapDispatch = { 
  createRedirection,
  updateRedirection,
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(SideBarView));
