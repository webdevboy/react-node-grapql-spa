import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./MediaCenter.scss";
import { connect } from "react-redux";
// import { hideSidebar } from '../../../redux/actions/sidebar';
import _ from "lodash";
import cx from "classnames";
import history from "core/history";
import MdCrop from "react-icons/lib/md/crop";
import IoIosColorFilter from "react-icons/lib/io/ios-color-filter";
import MdRotateRight from "react-icons/lib/md/rotate-right";
import IoArrowResize from "react-icons/lib/io/arrow-resize";
import MdCropFree from "react-icons/lib/md/crop-free";
import Action from "admin/components/Action";
import bytes from 'bytes';
// import LanguageSwitcher from '../../components/LanguageSwitcher';
import { updateOrCreateMediaTranslation } from '../../actions/media';


class Inspector extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = ({
    	filters: {
        gs: 0,
        blur: 0,
        br: 100,
        ct: 100,
        huer: 0,
        invert: 0,
        saturate: 100,
        sepia: 0,
      },
    });
    this.CROP_VIEW = "Crop";
    this.ROTATION_VIEW = "Rotation";
    this.SETTINGS_VIEW = "Settings";
    this.FILTERS_VIEW = "Filter";
    this.RESIZE_VIEW = "Resize";
  }


  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isLoading && !this.props.filesLength) {

    }
  }

  handleClickSave = async (e, isDuplicate) => {
    const { media, locales, updateOrCreateMediaTranslation, updateImageShow, save } = this.props;
    const { title, alt } = this.state;
    const language_id = _.find(locales, (entry) => { if (entry.locale.locale == this.state.locale) { return entry; } }).id;

    if ((title || alt) && media.id && language_id) {
      await updateOrCreateMediaTranslation(
        media.key,
        {
          media_id: media.id,
          language_id,
          title,
          alt
        }
      );
    }

    save(isDuplicate);
  }

  setView = (ev, view) => {
  	const { setCrop, resetCropBox } = this.props;
    this.setState({
      view,
    });
    setCrop(ev, view);
    view == this.SETTINGS_VIEW ? resetCropBox() : null;

    if (view !== this.CROP_VIEW) {
      $('.cropper-drag-box').hide();
      $('.cropper-crop-box').hide();
    }
  }

  log = (ev) => {
  	$(".cropper-canvas").find("img");
  }

  editImage = (ev) => {
    const gs = $("#gs").val(); // grayscale
    const blur = $("#blur").val(); // blur
    const br = $("#br").val(); // brightness
    const ct = $("#ct").val(); // contrast
    const huer = $("#huer").val(); // hue-rotate
    const invert = $("#invert").val(); // invert
    const saturate = $("#saturate").val();// saturate
    const sepia = $("#sepia").val(); // sepia

    const filters = 	`grayscale(${gs
    }%) blur(${blur
    }px) brightness(${br
    }%) contrast(${ct
    }%) hue-rotate(${huer
    }deg) invert(${invert
    }%) saturate(${saturate
    }%) sepia(${sepia}%)`;

    this.setState({
      filters: {
        gs,
        blur,
        br,
        ct,
        huer,
        invert,
        saturate,
        sepia,
      },
    });
    $(".cropper-canvas img").css("filter", filters);
    $(".cropper-canvas img").css("-webkit-filter", filters);

    this.props.updateImageShow(this.FILTERS_VIEW, filters);
  }

  changeLocale = (ev, locale) => {
    const { media } = this.props;
    const translation = _.find(media.translation, (caption, index) => {
      if (caption.language.locale.locale == locale) {
        return caption;
      }
    });

    this.setState({
      locale,
      title: translation ? translation.title : "",
      alt: translation ? translation.alt : "",
    });
  }

  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  setCropAspectRatio() {
    $('.cropper-drag-box').show();
    $('.cropper-crop-box').show();

    this.props.setCropAspectRatio();
  }

  renderFooter = () => (
    <div className="row">
      <div className="col-12 text-center">
        <button className={cx("pt-button pt-intent-primary", s.confirmBtn)} onClick={(e) => this.handleClickSave(e, false)}>Update</button>
        <button className={cx("pt-button pt-intent-primary", s.confirmBtn)} onClick={(e) => this.handleClickSave(e, true)}>Duplicate</button>
      </div>
    </div>  
  );

  renderRotationView = () => {
  	const { media } = this.props;
  	return (
      <Fragment>
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="gs">Abritary rotation</label>
          </div>
          <div className="col-md-8">
            <input id="gs" type="text" className="pt-input w-100" placeholder="Enter an abritary angle" onChange={ev => this.props.rotate(ev, parseInt(ev.target.value, 10))} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100")} onClick={ev => this.props.rotate(ev, 90)}>90º</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100")} onClick={ev => this.props.rotate(ev, -90)}>-90º</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100")} onClick={ev => this.props.rotate(ev, 180)}>180º</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100")} onClick={ev => this.props.rotate(ev, -180)}>-180º</button>
          </div>
        </div>
        {this.renderFooter()}
      </Fragment>
  		);
  }

  renderFiltersView = () => {
    const { media = {} } = this.props;
  	const { filters } = this.state;
  	return (
      <Fragment>
        <div className="row">
          <div className="col-3">
            <label htmlFor="gs">Grayscale</label>
          </div>
          <div className="col-9">
            <input id="gs" className="w-100" name="gs" type="range" min="0" max="100" value={filters.gs} onChange={this.editImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="blur">Blur</label>
          </div>
          <div className="col-9">
            <input id="blur" className="w-100" name="blur" type="range" min="0" max="10" value={filters.blur} onChange={this.editImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="br">Brightness</label>
          </div>
          <div className="col-9">
            <input id="br" className="w-100" name="br" type="range" min="0" max="200" value={filters.br} onChange={this.editImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="ct">Contrast</label>
          </div>
          <div className="col-9">
            <input id="ct" className="w-100" name="ct" type="range" min="0" max="200" value={filters.ct} onChange={this.editImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="huer">Hue Rotate</label>
          </div>
          <div className="col-9">
            <input id="huer" className="w-100" name="huer" type="range" min="0" max="360" value={filters.huer} onChange={this.editImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="invert">Invert</label>
          </div>
          <div className="col-9">
            <input id="invert" className="w-100" name="invert" type="range" min="0" max="100" value={filters.invert} onChange={this.editImage} /> 
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="saturate">Saturate</label>
          </div>
          <div className="col-9">
            <input id="saturate" className="w-100" name="saturate" type="range" min="0" max="500" value={filters.saturate} onChange={this.editImage} />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label htmlFor="sepia">Sepia</label>
          </div>
          <div className="col-9">
            <input id="sepia" className="w-100" name="sepia" type="range" min="0" max="100" value={filters.sepia} onChange={this.editImage} />
          </div>
        </div>
        {this.renderFooter()}
      </Fragment>
  		);
  }

  renderCropView = () => {
    const { sizeInfo } = this.props;

  	return (
      <Fragment>
        <div className="pt-card pt-elevation-0 space">
          <div className="row">
            <div className="col-3">
              <b className="label-row">Cropped Size: </b>
            </div>
            <div className="col-9">
              <span id="cropped-info">{sizeInfo.cropped}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100", s.confirmBtn)} onClick={ev => this.setCropAspectRatio(ev, 4 / 3)}>4/3</button>
          </div>
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100", s.confirmBtn)} onClick={ev => this.setCropAspectRatio(ev, 16 / 9)}>16/9</button>
          </div>
          <div className="col-md-8 offset-md-2">
            <button className={cx("pt-button pt-intent-warning w-100", s.confirmBtn)} onClick={ev => this.setCropAspectRatio(ev, NaN)}><MdCropFree size="24" color="#ffffff" /></button>
          </div>
        </div>
        {this.renderFooter()}
      </Fragment>     
  		);
  }

  renderResizeView = () => {
    const { sizeInfo } = this.props;

    return (
      <Fragment>
        <div className="pt-card pt-elevation-0 space">
          <div className="row">
            <div className="col-3">
              <b className="label-row">Original Size: </b>
            </div>
            <div className="col-9">
              <span>{sizeInfo.origin}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <b className="label-row">Current Size: </b>
            </div>
            <div className="col-9">
              <span>{sizeInfo.current}</span>
            </div>
          </div>
        </div>
        {this.renderFooter()}
      </Fragment>
    );
  	return ;
  }


  renderSettingsView = () => {
    const { media = {} } = this.props;
    const { title, alt } = this.state;
  	return (
      <Fragment>
        <div className="pt-card pt-elevation-0 space">
          <div className="row">
            <div className="col-3">
              <b className="label-row">Link</b>
            </div>
            <div className="col-9">
              <span>{media.filename}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <b className="label-row">Size</b>
            </div>
            <div className="col-9">
              <span>{bytes(media.size)}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <b className="label-row">Alt</b>
            </div>
            <div className="col-9">
            <input value={alt} name="alt" onChange={this.handleChange} placeholder="Enter image alt" className="pt-input" type="text" />
            </div>
          </div>
        </div>
        {this.renderFooter()}
      </Fragment>
    );
  }


  render() {
    const { media = {}, sizeInfo } = this.props;
    const { view = this.SETTINGS_VIEW } = this.state;

    return (
      <Fragment>
        <div className="header">
          <h4 className={{ color: 'white' }}>{view}</h4>

          <div className="actions">
            <Action key="item-action-crop" icon="pt-icon-cut" intent="pt-intent" action={ev => this.setView(ev, this.CROP_VIEW)} tooltip="Resize &amp; Crop" />
            <Action key="item-action-filter" icon="pt-icon-style" intent="pt-intent" action={ev => this.setView(ev, this.FILTERS_VIEW)} tooltip="Manipulate Picture" />
            <Action key="item-action-rotate" icon="pt-icon-refresh" intent="pt-intent" action={ev => this.setView(ev, this.ROTATION_VIEW)} tooltip="Rotate Picture" />
            <Action key="item-action-resize" icon="pt-icon-maximize" intent="pt-intent" action={ev => this.setView(ev, this.RESIZE_VIEW)} tooltip="Resize Picture" />
            <Action key="item-action-translate" icon="pt-icon-translate" intent="pt-intent" action={ev => this.setView(ev, this.SETTINGS_VIEW)} tooltip="Translation" />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center p-3">
            <canvas id="canvas" className={s['display-img']}></canvas>
            <canvas id="canvas-hidden-origin" className={s['display-img-hidden']}></canvas>
            <canvas id="canvas-hidden-dest" className={s['display-img-hidden']}></canvas>
          </div>
        </div>
        <div className="body">
          { view == this.ROTATION_VIEW ? this.renderRotationView() : null}
          { view == this.SETTINGS_VIEW ? this.renderSettingsView() : null}
          { view == this.FILTERS_VIEW ? this.renderFiltersView() : null}
          { view == this.CROP_VIEW ? this.renderCropView() : null}
          { view == this.RESIZE_VIEW ? this.renderResizeView() : null}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  locales: state.runtime.availableLocales,
});

const mapDispatch = {
  // hideSidebar,
  updateOrCreateMediaTranslation
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(Inspector));
