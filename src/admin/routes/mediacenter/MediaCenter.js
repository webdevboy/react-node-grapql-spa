import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';
import bytes from 'bytes';
import { Core as Uppy, AwsS3, Dashboard, Url, Instagram, DragDrop, ProgressBar, Dropbox, GoogleDrive } from 'uppy';
import s from "./MediaCenter.scss";
import { fetchFiles, newMedia, createFolder, getMedia, removeFile } from '../../actions/media';
import { connect } from "react-redux";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filter from "../../components/Filter";
import Action from "../../components/Action";
import Page from "../../components/Page";
import Link from "../../components/Link";
import { Alert, Menu, ContextMenu, Overlay, MenuItem, Button, MenuDivider, Tooltip, Popover, Intent, PopoverInteractionKind, Position } from "@blueprintjs/core";
import _ from "lodash";
import moment from 'moment';
import Filters from "../../components/filters";
import MdGrid from "react-icons/lib/md/view-comfy";
import MdList from "react-icons/lib/md/list";
import folderIcon from './gfx/folder.svg';
import document from './gfx/document.svg';
import video from './gfx/video.svg';
import pdfIcon from './gfx/pdf.svg';
import Cookies from 'js-cookie';
import { showLoading, hideLoading } from "react-redux-loading-bar";
import MediaCenterInspector from './MediaCenterInspector';
import Promise from 'bluebird';
import history from '../../../core/history';

const Collapsed = ({
  addMedia, editMedia, removeMedia, selection,
}) => (
  <Menu>
    <MenuItem
      iconName="pt-icon-add"
      onClick={() => addMedia}
      text="Add Media"
      intent={Intent.PRIMARY}
      className={s.menuItem}
    />
    <MenuItem
      iconName="pt-icon-edit"
      onClick={e => ((selection.length !== 1) ? e.preventDefault() : editMedia)}
      intent={Intent.NONE}
      text="Edit Media"
      className={cx(s.menuItem, (selection.length !== 1) ? "pt-disabled" : null)}
    />
    <MenuItem
      iconName="pt-icon-remove"
      onClick={e => ((!selection.length) ? e.preventDefault() : removeMedia)}
      text="Remove Media"
      intent={Intent.DANGER}
      className={cx(s.menuItem, (!selection.length) ? "pt-disabled" : null)}
    />
  </Menu>
);

const NewFolder = ({ createNewFolder, onChange }) => {
  return (
    <div className={s.newFolder}>
      <div className="pt-control-group">
        <div className="pt-input-group">
          <span className="pt-icon pt-icon-folder-open" />
          <input type="text" className="pt-input" onChange={e => onChange(e.target.value)} placeholder="Folder Name ..."/>
        </div>
        <button className="pt-button pt-intent-success" onClick={() => createNewFolder()}>
          <span className="pt-icon pt-icon-add" />
          Add
        </button>
      </div>
    </div>
  );
};

const MimeTypes = ({ file, onLoad }) => {

  if (!file.mimetype && !file.MimeType) {
    return null;
  }

  const image = new RegExp(/^image\//i);
  if (image.test(file.mimetype) || image.test(file.MimeType)) {
    return onLoad ? <img src={file.src || file.thumbnail} alt={file.filename || file.fileName} onLoad={e => onLoad(e)}/> : <img src={file.src || file.thumbnail} alt={file.filename || file.fileName}/>;
  }

  const videoR = new RegExp(/^video\//i);
  if (videoR.test(file.mimetype) || videoR.test(file.MimeType)) {
    return <img src={video} height="42px" width="42px" alt={file.filename || file.fileName} />;
  }

  const pdf = new RegExp(/^application\/pdf/i);
  if (pdf.test(file.mimetype) || pdf.test(file.MimeType)) {
    return <img src={pdfIcon} height="42px" width="42px" alt={file.filename || file.fileName} />;
  }

  return <img src={document} height="42px" width="42px" alt={file.filename || file.fileName} />;
};

class MediaCenter extends React.Component {

  constructor(props) {
    super(props);

    const gridView = Cookies.get('media_gridview');

    this.state = ({
      predicate: ["fileName", "name"],
      order: [true, true],
      search: '',
      selected: null,
      newFolder: '',
      gridView: (gridView == 'false') ? false : true,
      dimentions: []
    });

    this.uppy = new Uppy({
      debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1024 * 1024 * 5,
        // allowedFileTypes: ['image/jpg', 'image/gif', 'image/png', 'image/bmp', 'application/pdf', 'video/*'],
      },
      onBeforeUpload: (files) => {
        Object.keys(files).forEach(fileID => {
          let extension = files[fileID].name.split('.');
          if (extension[1] === 'jpeg') {
            extension[1] = 'jpg';
          }
          files[fileID].name = extension.join('.');

          if (this.props.currentFolder !== null) {
            files[fileID].name = this.props.currentFolder + files[fileID].name;
          }
        });
        this.uppy.setState({ files });
        // return Promise.resolve();
      },
    });
  }

  componentDidMount() {

    const hostname = (__DEV__) ? `//admin.${window.App.hostname}:${window.App.port}` : `//admin.${window.App.hostname}`;
    this.uppy
      .use(AwsS3, {
        target: Dashboard,
        host: hostname,
      })
      .use(Dashboard, {
        target: 'body',
        inline: false,
        trigger: '.uppy-modal-trigger',
        showProgressDetails: true,
        closeModalOnClickOutside: true,
        metaFields: [
          // { id: 'license', name: 'License', placeholder: 'specify license' },
          // { id: 'caption', name: 'Caption', placeholder: 'describe what the image is about' }
        ],
      })
      .run()
      .on('complete', (result) => {
        this.props.newMedia({
          files: result.successful,
        });
      });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  onChangeFolderName = (folderName) => {
    this.setState({ newFolder: folderName });
  };

  changeSearch = (search) => {
    this.setState({
      search: search.target.value.toUpperCase()
    });
  }

  editMedia = () => {
  }

  addMedia = () => {
  }

  removeMedia = () => {
  }

  alertRemoveMedia = () => {
  }

  select = async (key) => {
    if (this.props.fromPage) {
      this.props.selectMedia(_.find(this.props.files, f => f.key === key || f.Key === key));
    } else {
      await this.props.getMedia(key);
      this.setState({ selected: key });
    }
  }

  openFolder = async (folder) => {
    this.props.showLoading();
    await this.props.fetchFiles(folder);
    this.props.hideLoading();
    this.updateSearchQuery();
  }

  openParentFolder = async () => {
    this.props.showLoading();
    const currentFolder = this.props.currentFolder.split('/');
    if (currentFolder.length > 2) {
      const parent = `${currentFolder.splice(0, currentFolder.length - 2).join('/')}/`;
      await this.props.fetchFiles(parent);
    } else {
      await this.props.fetchFiles();
    }
    this.props.hideLoading();
    this.updateSearchQuery();
  }

  updateSearchQuery = () => {
    if (this.props.currentFolder) {
      history.replace({
        search: `?folder=${encodeURI(this.props.currentFolder)}`,
      });
    } else {
      history.replace({ search: `` });
    }
  }

  closeSidebar = () => {
    this.setState({ selected: undefined });
  };

  createNewFolder = async () => {
    await this.props.createFolder(this.state.newFolder);
    this.setState({ newFolder: '' });
  };

  toggleView = () => {
    this.setState({ gridView: !this.state.gridView }, () => {
      Cookies.set('media_gridview', this.state.gridView);
    });
  }

  toggleSortBy = (e, predicate) => {
    e.preventDefault();
    predicate.forEach(p=>{
      const index = this.state.predicate.findIndex(sp=>sp==p);
      if(index>=0){
        if(this.state.order[index]===true)
          this.state.order[index] = !this.state.order[index];
        else{
          this.state.predicate.splice(index,1);
          this.state.order.splice(index,1);
        }
      }
      else{
        this.state.predicate.push(p);
        this.state.order.push(true);
      }
    })
    this.setState({
      predicate: this.state.predicate,
      order: this.state.order
    });
  }

  filter = (inputs, fileOrFolder) => {
    if(!this.state.search) return inputs;
    return inputs.filter((input) => (fileOrFolder == 'file') ? input.filename.toUpperCase().indexOf(this.state.search)>=0 : input.name.toUpperCase().indexOf(this.state.search)>=0);
  }

  orderBy = (inputs) => {
    return _.orderBy(inputs, this.state.predicate, this.state.order.map(order => ((order) ?  "asc" : "desc")));
  }

  isArrowUp(fieldName){
    const index = this.state.predicate.findIndex(p=>p==fieldName);
    if(index<0) return undefined;
    return this.state.order[index];
  }

  handleFileDrop = (item, monitor) => {
    if (monitor) {
      const droppedFiles = monitor.getItem().files;
      this.props.uploadFiles({ files: droppedFiles });
    }
  }

  changeEditorLocale = (ev, locale) => {
    this.props.setEditorLocale({ locale });
  }

  createFolderAction = () => (
    <Popover position={Position.BOTTOM}>
      <Button className="pt-minimal pt-intent-success" iconName="pt-icon-folder-open">Create Folder</Button>
      <NewFolder createNewFolder={this.createNewFolder} onChange={this.onChangeFolderName} />
    </Popover>
  );

  getAppendText = () => {
    const { folder } = this.props;
    if (folder) {
      const folders = folder.split('/');
      const paths = folders.slice(0, -1);

      if (paths.length) {
        return paths.map((path, index) => {
          const currentPath = paths.slice(0, index + 1).map(p => p).join('/');
          return {
            text: path,
            link: `/media?folder=${currentPath}/`
          }
        })
      }
    }


    return [];
  }

  removeFile = async (key) => {
    await this.props.removeFile({
      keys: [key]
    });

    this.closeSidebar();
  }

  onLoad = ({target: img}) => {
    let dimentions = this.state.dimentions;
    dimentions.push({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
    this.setState({
      dimentions: this.state.dimentions
    });
  }

  render() {
    const {
      isLoading,
      files,
      folders,
      currentFolder,
      filesById,
      showSidebar,
      showChatInspector,
      locale,
      updateTranslationTable,
      fromPage,
      selectedPhotos,
      multiSelect
    } = this.props;

    const appendText = this.getAppendText();
    const { selected, search } = this.state;
    const filteredFolders = this.orderBy(this.filter(folders, 'folder'));
    const filteredFiles = this.orderBy(this.filter(files, 'file'));

    // orderBy
    const breadcrumbs = <Breadcrumbs key="breadcrumb" route={this.props.currentRoute} appendText={[{ text: 'Home', link: '/media' }, ...appendText]} />;

    const filters = [
      <Filter key="filter-search" type="search" label="Search" search={this.changeSearch} />,
    ];

    const actions = [
      this.createFolderAction(),
      <Action
        key="action-add-file"
        icon="pt-icon-add"
        intent="pt-intent-primary"
        className="uppy-modal-trigger"
        action={e => e.preventDefault()}
        tooltip="Upload Files"
        label="Upload"
      />,
      <Action
        key="toggle-grid-list-view"
        icon={(this.state.gridView) ? "pt-icon-list" : "pt-icon-grid-view"}
        action={e => this.toggleView(e)}
        tooltip="Toggle the view between grid/list modes"
      />,
    ];
    const actionPopover = (<Collapsed
      selection={this.state.selected}
      addMedia={this.addMedia}
      editMedia={this.editMedia}
      removeMedia={this.alertRemoveMedia}
    />);

    const selectedKeys = [];
    selectedPhotos && selectedPhotos.map(s => {
      selectedKeys.push(s.key);
    });

    return (
      <Page
        actions={actions}
        actionPopover={actionPopover}
        filters={filters}
        breadcrumbs={breadcrumbs}
      >
        <div className={s.container}>
          { (this.state.gridView)
            ?
              <ul className={s.grid}>
                {
                  (currentFolder !== '' && currentFolder !== null) ?
                    <li onDoubleClick={() => this.openParentFolder()}>
                      <div className={s.type}>
                        <img src={folderIcon} height="42px" width="42px" alt={'Go to parent'} />
                      </div>
                      <div className={s.filename}>..</div>
                    </li>
                  : null
                }
                {
                  filteredFolders.map((folder, index) => (
                  <li onDoubleClick={() => this.openFolder(folder.path)} key={`folder-${index}`}>
                    <div className={s.type}>
                      <img src={folderIcon} height="42px" width="42px" alt={folder.path} />
                    </div>
                    <div className={s.filename}>
                      {folder.name}
                    </div>
                  </li>
                ))}
                {
                  filteredFiles.map((file, index) => (
                    <li className={cx((multiSelect && selectedKeys.indexOf(file.key || file.Key) > -1) || (!multiSelect && (selected === file.key || selected === file.Key)) ? s.active : null)} onClick={() => this.select(file.key || file.Key)} key={`file-${index}`}>
                      <div className={s.type}>
                        <MimeTypes className={s.file} file={file} />
                      </div>
                      <div className={s.filename}>
                        {file.filename}
                      </div>
                    </li>
                  ))
                }
              </ul>
            :
              <table className="pt-table pt-striped lj-table">
                <thead>
                  <tr>
                    <th />
                    <th onClick={e => this.toggleSortBy(e, ["name", "fileName"])}>
                      <span>Filename</span>
                      {
                        this.isArrowUp('name') && <span className="pt-icon pt-icon-caret-up"/>
                      }
                      {
                        this.isArrowUp('name') === false && <span className="pt-icon pt-icon-caret-down"/>
                      }
                    </th>
                    <th onClick={e => this.toggleSortBy(e, ["MimeType"])}>
                      <span>Kind</span>
                      {
                        this.isArrowUp('MimeType') && <span className="pt-icon pt-icon-caret-up"/>
                      }
                      {
                        this.isArrowUp('MimeType') === false && <span className="pt-icon pt-icon-caret-down"/>
                      }
                    </th>
                    <th onClick={e => this.toggleSortBy(e, ["Size"])}>
                      <span>Size</span>
                      {
                        this.isArrowUp('Size') && <span className="pt-icon pt-icon-caret-up"/>
                      }
                      {
                        this.isArrowUp('Size') === false && <span className="pt-icon pt-icon-caret-down"/>
                      }
                    </th>
                    <th onClick={e => this.toggleSortBy(e, ["LastModified"])}>
                      <span>Created At</span>
                      {
                        this.isArrowUp('LastModified') && <span className="pt-icon pt-icon-caret-up"/>
                      }
                      {
                        this.isArrowUp('LastModified') === false && <span className="pt-icon pt-icon-caret-down"/>
                      }
                    </th>
                    <th className="single-action-col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    (currentFolder !== '' && currentFolder !== null) ?
                      <tr onDoubleClick={() => this.openParentFolder()}>
                        <td>
                          <img src={folderIcon} height="42px" width="42px" alt={'Go to parent'} />
                        </td>
                        <td>..</td>
                        <td />
                        <td />
                        <td />
                        <td></td>
                      </tr>
                    : null
                  }
                  {
                    filteredFolders.map((folder, index) => (
                      <tr onDoubleClick={() => this.openFolder(folder.path)} key={`folder-${index}`}>
                        <td>
                          <img src={folderIcon} height="42px" width="42px" alt={folder.path} />
                        </td>
                        <td>{folder.name}</td>
                        <td />
                        <td />
                        <td />
                        <td></td>
                      </tr>
                    ))
                  }
                  {
                    filteredFiles.map((file, index) => (
                      <tr className={cx(((selected === file.key || selected === file.Key)) ? s.active : null)} onClick={() => this.select(file.key || file.Key)} key={`file-${index}`}>
                        <td style={multiSelect ? {display: 'flex', alignItems: 'center'} : null}>
                          <input type="checkbox" className={multiSelect ? cx("mr-2", s.showCheck) : s.hideCheck} checked={multiSelect && selectedKeys.indexOf(file.key || file.Key) > -1} />
                          <MimeTypes className={s.file} file={file} onLoad={this.onLoad} />
                        </td>
                        <td>
                          {file.filename}
                          <br/>
                          <span>{this.state.dimentions[index] && (this.state.dimentions[index].width + ' x ' + this.state.dimentions[index].height)}</span>
                        </td>
                        <td>{file.mimetype || file.MimeType}</td>
                        <td>{bytes(file.size || file.Size)}</td>
                        <td>{moment(file.created_at || file.LastModified).calendar() }</td>
                        <td></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
          }
        </div>

        <Overlay isOpen={(selected)} transitionName="slide" inline onClose={this.closeSidebar}>
          <MediaCenterInspector
            key="file-inspect-sidebar"
            file={filesById[selected]}
            removeFile={this.removeFile}
          />
        </Overlay>

      </Page>
    );
  }
}

const mapStateToProps = state => {
  const filesById = state.media.byId;
  const files = state.media.ids.map(id => filesById[id]) || [];
  const folders = state.media.folders.filter(folder => !(['thumbnails', 'original'].includes(folder.name)));

  return {
    files,
    filesById,
    folders,
    currentFolder: state.media.currentFolder,
  };
};

const mapDispatch = {
  getMedia,
  fetchFiles,
  newMedia,
  showLoading,
  hideLoading,
  createFolder,
  removeFile,
};

export default connect(mapStateToProps, mapDispatch)(withStyles(s)(MediaCenter));
