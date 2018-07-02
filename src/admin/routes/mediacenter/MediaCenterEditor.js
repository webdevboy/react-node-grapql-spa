import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./MediaCenter.scss";
import { connect } from "react-redux";
import { Toaster, Position, Intent } from "@blueprintjs/core";
import { DragDropContext, DragDropContextProvider } from "react-dnd";
import HTML5Backend, { NativeTypes } from "react-dnd-html5-backend";
import { debounce } from "lodash";
import Modal from 'react-responsive-modal';
import Cropper from "react-cropper";
import cx from "classnames";
import Sidebar from '../../components/Sidebar';
import Inspector from "./EditorInspector";
import crpCss from 'cropperjs/dist/cropper.css';
import uuidv4 from 'uuid/v4';

import { newMedia } from '../../actions/media';
import { times } from "async";

const CROP_VIEW = "Crop",
      ROTATION_VIEW = "Rotation",
      SETTINGS_VIEW = "Settings",
      FILTERS_VIEW = "Filter",
      RESIZE_VIEW = "Resize";

let originalImageWidth = 0,
    originalImageHeight = 0,
    originalWindowWidth = 0,
    originalWindowHeight = 0,
    filters = '',
    angle = 0,
    isCropping = false,
    currentViewMode = CROP_VIEW;
let croppedData = {
      width: 0,
      height: 0,
      left: 0,
      right: 0
    };

class MediaCenterEditor extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      crop: false,
      aspectRatio: NaN,
      currentRatio: 1,
      originRatio: -1
    };

    originalWindowWidth =  window.innerWidth;
    originalWindowHeight = window.innerHeight - 50;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isLoading && !this.props.filesLength) {

    }
  }

  componentDidMount() {
    const { media, id } = this.props;

    if (!media) return;

    const that = this;
    const src = media.src;
    const image = new Image();
    image.src = src;
    image.crossOrigin = 'anonymous';
    image.onload = function (){
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      const portionRatio = canvas.height / image.naturalHeight;
      context.drawImage(image, (canvas.width - image.naturalWidth * portionRatio) / 2, 0, image.naturalWidth * portionRatio, canvas.height);

      originalImageWidth = image.naturalWidth;
      originalImageHeight = image.naturalHeight;
    }
  }

  rotate = (ev, newAngle) => {
    angle = newAngle;
    this.cropper.rotate(angle);
    this.updateImageShow();
  }

  clearCanvas() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#394a59";
    context.fill();
  }

  updateImageShow = async (type, newFilters) => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined' || !croppedData) {
      return;
    }

    if (this.cropper && croppedData) {
      this.cropper.setCropBoxData(croppedData);
    }

    const image = new Image();
    image.src = this.cropper.getCroppedCanvas() && this.cropper.getCroppedCanvas().toDataURL();
    image.crossOrigin = 'anonymous';

    const that = this;
    await new Promise(resolve => {
    image.onload = () => {
      that.clearCanvas();

      if (currentViewMode === RESIZE_VIEW) {        
        if (that.state.originRatio === -1) {
          context.drawImage(image, 0, 0, originalImageWidth, originalImageHeight);
        }
      } else {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        if (newFilters || filters) {
          context.filter = newFilters || filters;
          filters = newFilters || filters;
        }
        const portionRatio = canvas.height / image.naturalHeight;
        context.drawImage(image, (canvas.width - image.naturalWidth * portionRatio) / 2, 0, image.naturalWidth * portionRatio, canvas.height);
      }
        resolve();
    }
    });
  }

  grayscale = (ev) => {
    const dataUrl = this.cropper.getCroppedCanvas().toDataURL();
    this.updateImageShow();
  }

  resize = (e) => {
    console.log(e);
    const { originRatio, currentRatio } = this.state;

    if (currentViewMode !== RESIZE_VIEW) return;

    const updatedState = {};

    if (originRatio === -1) {
      updatedState.originRatio = e.detail.oldRatio;
    }
    updatedState.currentRatio = e.detail.ratio;

    this.setState(updatedState);
    this.updateImageShow();
  }

  setCrop = (ev, viewType) => {
    currentViewMode = viewType;
    this.setState({ crop: viewType === CROP_VIEW });
    this.updateImageShow();
  }

  setCropAspectRatio = (ev, ratio) => {
    this.setState({ aspectRatio: ratio });
    this.updateImageShow();
  }

  // allowCrop = (ev) => {
  //   const { crop } = this.state;
  //   if (!crop) {
  //     ev.preventDefault();
  //     ev.stopPropagation();
  //   }
  // }

  save = async (isDuplicate) => {
    const { media, newMedia } = this.props;
    const { originRatio, currentRatio } = this.props;

    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    let data = this.cropper.getCroppedCanvas().toDataURL();
    
    if (currentViewMode === RESIZE_VIEW) {
      const canvas = document.getElementById('canvas-hidden-dest');
      canvas.width = originalImageWidth * currentRatio / originRatio;
      canvas.height = originalImageHeight * currentRatio / originRatio;
      const context = canvas.getContext('2d');

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      data = canvas.toDataURL();

    } else {
      const canvasOrigin = document.getElementById('canvas-hidden-origin');
      const canvasDest = document.getElementById('canvas-hidden-dest');

      const image = await new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img)
        img.onerror = reject;
        img.src = data;
      });

      canvasOrigin.width = image.naturalWidth;
      canvasOrigin.height = image.naturalHeight;
      canvasDest.width = image.naturalWidth;
      canvasDest.height = image.naturalHeight;
      const originContext = canvasOrigin.getContext('2d');
      const destContext = canvasDest.getContext('2d');

      originContext.filter = filters;
      originContext.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

      destContext.filter = getComputedStyle(canvasOrigin).filter;
      destContext.drawImage(canvasOrigin, 0, 0, image.naturalWidth, image.naturalHeight);

      data = canvasDest.toDataURL();
    }
    console.log('Saved Data: ', data);

    // creating new name based on timestamp
    const timestamp = Date.now();
    let name = media.filename;
    let temp = name.split('.');
    const ext = temp.pop();
    const prefix = temp[0];
    if (temp[0].indexOf('_') !== -1) prefix.split('_').pop();
    name = `${prefix}_${timestamp}.${ext}`

    // creating new key based on timestamp
    let key = media.key || '';
    temp = key.split('/');
      temp.pop();
      temp.push(`${name}`);
      key = temp.join('/');

    const file = {
      id: isDuplicate ? uuidv4() : media.id,
      key,
      name,
      mimetype: media.mimetype,
      base64: data
    };
    await newMedia({ files: [file] });

    this.toaster.show({
      message: isDuplicate ? 'Dupulicated Sucessfully!' : 'Saved Sucessfully!',
      timeout: 3000,
      intent: Intent.SUCCESS,
      iconName: "pt-icon-success",
    });
  }

  resetCropBox = () => {
    this.cropper.reset();
    this.cropper.clear();
  }

  cropping = () => {
    if (this.cropper) {
      croppedData = this.cropper.getData();
      const sizeInfo = this.getSizeInfo();
      $('#cropped-info').text(sizeInfo.cropped);
    }
  }

  cropEnd = async () => {
    if (this.cropper) {
      croppedData = this.cropper.getCropBoxData();
      this.cropper.setCropBoxData(croppedData);
      this.updateImageShow();
    }
  }

  getSizeInfo() {
    const { originRatio, currentRatio } = this.state;
    let current = parseInt(originalImageWidth * currentRatio / originRatio)
                  + 'px  X  ' +
                  parseInt(originalImageHeight * currentRatio / originRatio)
                  + 'px';
    let origin = originalImageWidth + 'px  X  ' + originalImageHeight + 'px';
    let cropped = '' + parseInt(croppedData.width) + ' px  X  ' + parseInt(croppedData.height) + ' px';
    if (originRatio === -1) current = origin;
    return {
      current,
      origin,
      cropped
    };
  }

  render() {
    const { media, id, updateOrCreateMediaTranslation } = this.props;
    const { crop, aspectRatio, isCropping } = this.state;
    const sizeInfo = this.getSizeInfo();

    if (!media) return null;
    const src = media ? media.src : null;

    return (
      <div className={cx("wrapper pt-dark", s["container-editor"])}>
        <Toaster position={Position.TOP} ref={ref => this.toaster = ref} />

        <div className={s.canvas}>
          <Cropper
            ref={cropper => { this.cropper = cropper; }}
            src={src}
            style={{ height: originalWindowHeight, width: originalWindowWidth * 0.55, padding: '10px' }}
            aspectRatio={aspectRatio}
            guides
            autoCrop={false}
            viewMode={1}
            dragMode={crop ? "crop" : "move"}
            crossOrigin="anonymous"
            background={false}
            toggleDragModeOnDblclick={false}
            cropstart={() => this.cropping()}
            cropmove={() => this.cropping()}
            cropend={() => this.cropEnd()}
            zoom={(e) => this.resize(e)}
          />
        </div>
        <div className={cx("body", s.sidebar)}>
          <Sidebar fixed float show fullWidth >
            <Inspector media={media} sizeInfo={sizeInfo} {...this}/>
          </Sidebar>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  filesLength: state.media.filesLength,
  isLoading: state.media.isLoading,
});

export default connect(mapStateToProps, { newMedia })(DragDropContext(HTML5Backend)(withStyles(crpCss, s)(MediaCenterEditor)));

