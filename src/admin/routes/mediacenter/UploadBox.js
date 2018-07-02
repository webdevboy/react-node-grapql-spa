import React, { Component } from "react";
import PropTypes from "prop-types";
import { DropTarget } from "react-dnd";
import cx from "classnames";
import s from "./MediaCenter.scss";
import _ from "lodash";
import { Loader } from "react-loaders";
import history from "core/history";
import { CSSGrid, measureItems, makeResponsive, layout } from "react-stonecutter";
import bytes from "bytes";
import TiEdit from "react-icons/lib/ti/edit";
// import { updateOrCreateMediaTranslation } from '../../../redux/actions/media';
import { connect } from "react-redux";


const boxTarget = {
  drop(props, monitor, component) {
    if (props.onDrop) {
      props.onDrop(props, monitor);
    }
  },
};


class ListRow extends React.Component {
  constructor(props) {
    super(props);
    const translation = _.find(props.media.translation, (caption, index) => {
      if (caption.language.locale.locale == props.locale) {
        return caption;
      }
    });
    this.state = {
      translation,
      alt: translation ? translation.alt : "",
      title: translation ? translation.title : "",
    };
  }

  edit = (ev, edit) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({ [edit]: !this.state.edit });
  }

  keyDown = (ev) => {
    if (ev.keyCode == 13) {
      ev.preventDefault();
      ev.stopPropagation();
      $(ev.target).blur();
      return false;
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.locale != this.props.locale) {
      const translation = _.find(this.props.media.translation, (caption, index) => {
        if (caption.language.locale.locale == this.props.locale) {
          return caption;
        }
      });
      this.setState({
        translation,
        alt: translation ? translation.alt : "",
        title: translation ? translation.title : "",
        editAlt: false,
        editTitle: false,
      });
    }
  }
  save = () => {
    const {
      media, locales, updateOrCreateMediaTranslation, locale,
    } = this.props;
    const { title, alt } = this.state;
    const language_id = _.find(locales, (entry) => { if (entry.locale.locale == locale) { return entry; } }).id;
    updateOrCreateMediaTranslation({
      media_id: media.id, language_id, title, alt,
    });
    this.setState({
      editAlt: false,
      editTitle: false,
      translation: {
        alt: this.state.alt,
        title: this.state.title,
      },
    });
  }

  handleChange = (ev) => {
    ev.stopPropagation();

    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  render() {
    const { media, locale, goTo } = this.props;
    const {
      editAlt, editTitle, translation, alt, title,
    } = this.state;
    return (
      <tr onClick={e => goTo(e, media.id)}>
        <td><img className={cx((media.extension === "svg") ? s.svg : "")} src={`//d2senxzasulqn5.cloudfront.net/${media.filename}`} /></td>
        <td>{media.filename}</td>
        <td>{bytes(media.size, { unitSeparator: " " })}</td>
        <td>{ (translation && translation.alt && !editAlt) ?
          <span><TiEdit size={24} onClick={ev => this.edit(ev, "editAlt")} className={s.icn} />{alt}</span>
         :
          <div className="input-group">
            <input className="form-control" type="text" name="alt" value={alt} aria-describedby="basic-addon2" onClick={ev => ev.stopPropagation()} onKeyDown={this.keyDown} onChange={this.handleChange} onBlur={this.save} />
          </div>}
        </td>
        <td>{ (translation && translation.title && !editTitle) ?
          <span><TiEdit size={24} onClick={ev => this.edit(ev, "editTitle")} className={s.icn} />{title}</span>
         :
          <div className="input-group">
            <input className="form-control" type="text" name="title" value={title} aria-describedby="basic-addon2" onClick={ev => ev.stopPropagation()} onKeyDown={this.keyDown} onChange={this.handleChange} onBlur={this.save} />
          </div>}
        </td>
      </tr>);
  }
}


class UploadBox extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDrop: PropTypes.func,
  };

  constructor(props) {
    super();
    this.state = {
      predicate: "timeago",
      order: true,
    };
  }

  goTo = (e, id) => {
    const { setSelectedMedia, showSidebar } = this.props;
    e.preventDefault();
    setSelectedMedia(e, id);
    showSidebar();
    // history.push(`/mediacenter/${id}`);
  }


  componentDidMount() {
    // this.instance = Bricks({
    //   container: this.brickWall,
    //   packed: 'data-packed',
    //   sizes: [
    //     { mq: '672px', columns: 4, gutter: 15 },
    //     { mq: '991px', columns: 6, gutter: 15 },
    //   ],
    //   position: false
    // }).pack();

    // window.onresize = (event) => {
    //   this.instance.resize(true)
    // };

    // this.instance.on('resize', () => {
    //   this.instance.update().pack();
    // });
  }


  toggleSortBy = (e, predicate) => {
    e.preventDefault();

    if (this.state.predicate === predicate) {
      this.setState({ order: !this.state.order });
    } else {
      this.setState({ predicate });
    }
  }


  renderGrid = () => {
    const {
      canDrop, isOver, connectDropTarget, isLoading, filesLength, library, view, search,
    } = this.props;
    const Grid = makeResponsive(measureItems(CSSGrid), { maxWidth: 1920, measureImages: false });
    return (<Grid
      component="ul"
      columns={8}
      columnWidth={156}
      gutterWidth={15}
      gutterHeight={15}
      duration={300}
      itemHeight={240}
      layout={layout.simple}
    >

      { (isLoading) ? _.times(filesLength).map((n, index) => (<li key={`loader-${index}`} className={cx(s.brick)}>
        <a className={cx(s.item)} href="#" onClick={e => e.preventDefault()}>
          <figure>
            <Loader type="ball-beat" active />
          </figure>
        </a>
      </li>)) : null }

      { Object.keys(library).map(key =>
        (<li key={library[key].id} className={cx(s.brick)}>
          <a className={cx(s.item)} href={`/mediacenter/${library[key].id}`} onClick={e => this.goTo(e, library[key].id)}>
            <figure>
              <img className={cx((library[key].extension === "svg") ? s.svg : "")} src={`${library[key].src}`} />
            </figure>
            <div className={s.caption}>
              <span>{library[key].filename}</span>
            </div>
          </a>
          </li>))}

    </Grid>);
  }

  renderList = () => {
    const {
      canDrop, isOver, connectDropTarget, isLoading, filesLength, view, locales, locale, updateOrCreateMediaTranslation,
    } = this.props;
    const { editAlt = false, editTitle = false } = this.state;

    let library = _.reduce(this.props.library, (result, value, key) => {
      result.push(value);
      return result;
    }, []);

    library = library.filter((media) => {
      const filteredRes = Object.keys(media).map(key => _.includes(typeof media[key] === "string" ? media[key].toLowerCase() : "", this.props.search.toLowerCase()));
      return filteredRes.includes(true);
    });

    library = _.orderBy(library, [this.state.predicate], [(this.state.order) ? "desc" : "asc"]);

    // if (this.state.filters) {
    //   urls = _.filter(urls, this.state.filters);
    // }

    return (<table className={cx(s.table)}>
      <thead>
        <tr>
          <th>Picture</th>
          <th onClick={e => this.toggleSortBy(e, "filename")} className={cx(s.predicate, "hidden-xs-down", s.clickable, (this.state.predicate === "filename") ? s.current : "", (this.state.predicate === "filename" && this.state.order) ? s.desc : s.asc)}><span>FileName</span></th>
          <th onClick={e => this.toggleSortBy(e, "size")} className={cx(s.predicate, "hidden-xs-down", s.clickable, (this.state.predicate === "size") ? s.current : "", (this.state.predicate === "size" && this.state.order) ? s.desc : s.asc)}><span>Size</span></th>
          <th>Alt</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody onScroll={this.onScrollToBottom}>

        { (isLoading) ? _.times(filesLength).map((n, index) =>
              (<tr key={index}>
                <td><Loader type="ball-beat" active /></td>
                <td />
                <td />
                <td />
                <td />
                <td />
               </tr>)) : null }

        {Object.keys(library).map((key, value, index) => (<ListRow media={library[key]} key={key} locales={locales} locale={locale} updateOrCreateMediaTranslation={updateOrCreateMediaTranslation} goTo={this.goTo} />))}

      </tbody>
            </table>);
  }


  render() {
    const {
      canDrop, isOver, connectDropTarget, isLoading, filesLength, library, view,
    } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(<div className={cx(s.placeholder, isActive ? s.isActive : "")}>

      {view == "GRID" ? this.renderGrid() : null}
      {view == "LIST" ? this.renderList() : null}

                             </div>);
  }
}

const mapStateToProps = state => ({
  locale: state.intl.locale,
});

const mapDispatch = {
  // updateOrCreateMediaTranslation
};

// <span>{library[key].extension}</span>
export default connect(mapStateToProps, mapDispatch)(DropTarget(props => props.accepts, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(UploadBox));


/**
 *


          { (isLoading) ? _.times(count).map((n, index) => <li key={index} className={s.isloading}><Loader type="ball-beat" active={true} /></li> ) : null }
          { uploads.map((file, index) =>
            <li key={file.id}>
              <a href="#">
                <figure>
                  <img src={'//d2senxzasulqn5.cloudfront.net/'+file.filename} />
                  <figcaption>
                    {file.filename} <br />
                    {file.extension}
                  </figcaption>
                </figure>
              </a>
            </li>) }
 */
