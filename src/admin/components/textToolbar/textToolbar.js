import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './textToolbar.css';
import List from 'react-feather/dist/icons/list';
import Link2 from 'react-feather/dist/icons/link-2';
import ChevronLeft from 'react-feather/dist/icons/chevron-left';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import cx from 'classnames';
import BlockPicker from 'react-color/lib/components/block/Block';
import { updateChild } from '../../../redux/actions/editor';
import { connect } from 'react-redux';

class TextToolbar extends React.Component {


   
  constructor(props) {
    super(props);
    this.italic = this.italic.bind(this);    
    this.bold = this.bold.bind(this);
    this.underline = this.underline.bind(this);    
    this.handlekeyPress = this.handlekeyPress.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.setLink = this.setLink.bind(this);
    this.setCode = this.setCode.bind(this);
    this.updateText = this.updateText.bind(this);
    
    this.state={
      italic: props.selected.style['font-style'] === 'italic',
      bold: props.selected.style['font-weight'] === 'bold',
      underline: props.selected.style['text-decoration'] === 'underline',
      input: false,
      key: this.props.selected.getAttribute('data-key')
    };
  }

  

  componentDidMount(){

  }


  italic(ev){
    this.stop(ev);
    this.setState({italic : !this.state.italic});    
    // this.props.selected.style['font-style'] = this.state.italic ? 'initial' : 'italic'; 
    this.updateStyle({'fontStyle': this.state.italic ? 'initial' : 'italic'});
  }
  bold(ev){
    this.stop(ev);
    this.setState({bold : !this.state.bold});    
    this.updateStyle({'fontWeight': this.state.bold ? 'initial' : 'bold'}); 
  }
  underline(ev){
    this.stop(ev);
    this.setState({underline : !this.state.underline});    
    this.updateStyle({'textDecoration': this.state.underline ? 'initial' : 'underline'}); 
  }

  updateText(markup){
    let query = $(this.props.selected);
    let text = '';
    switch(markup){
      case 'none':
        if(query.contents().is('h1' || 'h2' || 'h3' || 'h4' || 'h5' || 'h6')){
           text = query.contents().html();
          }
          this.props.updateChild(this.state.key, {text: text}); 
        break;
      default:
        
        if(query.is('h1' || 'h2' || 'h3' || 'h4' || 'h5' || 'h6')){
          query.replaceWith('<'+markup+'>'+query.contents().html()+'</'+markup+'>');
         // text = query.contents().html();
        }
        else{
          // console.log('2',query.html());
          query.contents().wrap('<'+markup+'></'+markup+'>');
          
        }
        text = query.html();
        this.props.updateChild(this.state.key, {text: text}); 
        break;
    }
  }

  setLink(ev){
    this.stop(ev);
    this.setState({
      input: !this.state.input
    })
    // let text = this.props.selected.children[0] ? ('<a href="/test">'+this.props.selected.children[0].innerHTML+'</a>') : ('<a href="test">'+this.props.selected.innerHTML+'</a>');
    // this.props.updateChild(this.state.key, {text: text}); 
  }

  setCode(){
    let query = $(this.props.selected);
    let text = '';
    if(query.contents().is('code')){
     text = query.contents().html();
    }
    else{
      // console.log('2',query.html());
      query.contents().wrap('<code></code>');
      text = query.html();
    }
    this.props.updateChild(this.state.key, {text:text}); 
  }

  handlekeyPress(ev){
    // console.log('ok');
    // let key = ev.which || ev.keyCode;
    // this.props.selected.innerHTML+=String.fromCharCode(key);
  }

  stop(ev){
    ev.stopPropagation();
  }


  updateStyle(style){
    this.props.updateChild(this.props.selected.getAttribute('data-key'), {}, style); 
  }

  render() {
    return (
        <div className={s['toolbar']} style={{top: (this.props.position.top)+'px', left: this.props.position.left+'px'}} onKeyPress={this.handlekeyPress} onMouseOver={this.stop}>
        <div >
          <select className={s['fieldInput']} onClick={this.stop} onChange={(ev) => this.updateText((ev.target.value || ev.target.options[ev.target.selectedIndex].value))}>
            <option value={'none'}>{'H-'}</option>
            {[...Array(6)].map((x, i) =>
              <option key={i} value={'h'+(i+1)}>{'H'+(i+1)}</option>
            )}
          </select>
          <button className={cx(s['actionsBtns'], (this.state.italic ? s['active'] : ''))} 
                  onClick={this.italic}
                  style={{fontStyle:'italic'}} >I</button>
          <button className={cx(s['actionsBtns'], (this.state.bold ? s['active'] : ''))} 
                  onClick={this.bold} 
                  style={{fontStyle:'bold'}} >B</button>
          <button className={cx(s['actionsBtns'], (this.state.underline ? s['active'] : ''))} 
                  onClick={this.underline} 
                  style={{textDecoration:'underline'}} >U</button>
          <button className={cx(s['actionsBtns'], (this.state.setLink ? s['active'] : ''))} 
                  onClick={this.setLink}><Link2/></button>
          <button className={cx(s['actionsBtns'], (this.state.setLink ? s['active'] : ''))} 
                  onClick={this.setCode}><ChevronLeft/><ChevronRight/></button>
          <button className={cx(s['actionsBtns'], (this.state.setLink ? s['active'] : ''))} 
                  onClick={this.linkto}><List/></button>
          </div>
          {this.state.input ? <div><input onClick={this.stop} type='text' placeholder='https://'/><input placeholder='Title'onClick={this.stop} type='text' /><button className={cx('btn','btn-primary')}>Set</button></div> : ''}
        </div>

    );
  }
}


export default connect(null, { updateChild })(withStyles(s)(TextToolbar));