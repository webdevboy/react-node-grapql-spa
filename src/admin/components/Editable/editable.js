import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './editable.css';
import { updateChild } from '../../../redux/actions/editor';
import { connect } from 'react-redux';
import TextToolbar from '../textToolbar';


class Editable extends React.Component {

  constructor(props) {
    super(props);
    this.setText = this.setText.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.setEditable = this.setEditable.bind(this);
    this.state = {
      value: '',
      editable: false,
    };
  }

componentDidMount(){

}

componentDidUpdate(prevProps, prevState) {
};

setText(ev){
  if (ev.keyCode == 13 && ev.shiftKey == false) {
    ev.preventDefault();
    return false;
  }
  this.setState({
    editable: false
  });
  React.Children.map(this.props.children, child => {
     this.props.updateChild(child.props.id,{text: ev.target.children[0].innerHTML});
     // let alias = ev.target.children[0].innerText.length < 8 ? ev.target.children[0].innerText : ev.target.children[0].innerText.substring(0,10)+'...';
     // this.props.updateChild(child.props.id,{alias: alias});
  });
}

cancelEnter(ev){
  if (ev.keyCode == 13 && ev.shiftKey == false) {
    ev.preventDefault();
    ev.stopPropagation();
    document.activeElement.blur();
    return false;
  }
}

renderChildren(props, value) {
  return React.Children.map(props.children, child => {
    return React.cloneElement(child, {
      text: value,
    })
  });
}

setEditable(ev){
  const element = $(ev.target);
  const { body, id } = this.props;
  //textToolbar with: 500px and height 50px
  const size = {width: 500, height: 50};
  const position = (element) => {
    const positionX = (element.offset().left);
    const positionY = (element.offset().top + element.height() + size.height > window.innerHeight) ? element.offset().top : element.offset().top + element.height();
    return {top: positionY, left: positionX}
  };
  if(!body[id].component.props.locked){
    this.setState({
      position: position(element),
      editable: true,
    });
  }
}

findElement(key){
  const element = ($('#viewer').find(`[data-key='${key}']`)[0]);
  return element;
}

render() {
  const { id, body, classnames } = this.props;
  return (
    <div id="editable" className={cx(classnames, s.editable)} 
                        onClick={this.handleClick} 
                        contentEditable={this.state.editable} 
                        suppressContentEditableWarning 
                        onKeyDown={this.cancelEnter} 
                        onBlur={this.setText} 
                        data-key={id}
                        onDoubleClick={this.setEditable}>

      {this.props.children}
      {/*this.state.editable ? <TextToolbar position={this.state.position} selected={this.findElement(id)}/> : ''*/}
    </div>
    );
}
}

const mapStateToProps = (state, ownProps) => ({
  body: state.editor.present
});


export default connect(mapStateToProps, { updateChild })(withStyles(s)(Editable));











