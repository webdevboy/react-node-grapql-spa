import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./MediaCenter.scss";
import { Alert, Intent, Popover, Position, Button } from '@blueprintjs/core';
import { connect } from "react-redux";
import Sidebar from "admin/components/Sidebar";
import Action from "admin/components/Action";
import _ from "lodash";
import cx from "classnames";
import history from "core/history";
import bytes from "bytes";
import { updateOrCreateMediaTranslation, updateFileName } from '../../actions/media';
import Clipboard from 'react-clipboard.js';

const isImageRegex = new RegExp(/^image\//i);

class MediaCenterInspector extends React.Component {

  maxLength = 255;

  constructor(props) {
    super(props);

    const { file } = this.props;
    let filename = file ? file.filename : '';
    filename = filename.split('.')[0];

    this.state = {
      translation: {
        alt: '',
      },
      filename,
      selected: undefined,
      removeWarning: false,
      isUpdatingName: false
    };

    this.originalState = _.clone(this.state);
    this.isImage = isImageRegex.test(this.props.file.mimetype || this.props.file.MimeType);
  }

  handleClickEdit = () => {
    const { file: { id } } = this.props;
    history.push(`/media/${id}`);
  }

  alertRemoveFile = (e) => {
    e.stopPropagation();
    this.setState({
      removeWarning: true      
    });
  }

  confirmRemoveFile = async () => {
    await this.props.removeFile(this.props.file.key);
    this.setState({      
      removeWarning: false,
    });
  }

  reset = () => this.setState(this.originalState);

  closeRemoveWarning = () => {
    this.setState({      
      removeWarning: false,
    });
  }

  saveTranslation = async (e) => {
    e.preventDefault();
    const { file } = this.props;
    const { selected: language_id, translation } = this.state;

    console.log()

    await this.props.updateOrCreateMediaTranslation(file.key, {
      language_id,
      media_id: file.id,
      alt: translation.alt,
    });

    this.reset();
  }

  cancelTranslation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.reset();
  }

  updateAlt = (val) => {
    this.setState({
      translation: {
        ...this.state.translation,
        alt: val,
      },
    });
  }

  toggleTranslation = (e, id, alt) => {
    e.preventDefault();

    if (alt) {
      this.setState({
        selected: id,
        translation: {
          ...this.state.translation,
          alt,
        },
      });
    } else {
      this.setState({selected: id});
    }
    
  }

  weAreGood = () => {
    return (
      <div className="row expanded">
        <div className="pt-non-ideal-state">
          <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
            <span className="pt-icon pt-icon-endorsed" />
          </div>
          <h4 className="pt-non-ideal-state-title">We're good!</h4>
          <div className="pt-non-ideal-state-description">
            No translations missing!
          </div>
        </div>
      </div>
    )
  }

  existingTranslations = () => {
    const { translationsFound } = this.props;
    const { translation, selected } = this.state;
    console.log(this.props);

    return (
      <div className="row block">
        <div class="col-12">
          <b className="label-row">Translations:</b>
          <ul className="list">
            { translationsFound.map(({ id, alt, language: { id: language_id, language, locale } }) => (
              <li key={`found-translation-of-${locale}`}>
                <div className="list-item block">
                  <div className="row fill no-margin">
                    <span>
                      {language} <span className="pt-tag pt-minimal pt-intent-success">{locale}</span>
                    </span>
                    <div className="actions">
                      {
                        (selected === language_id)
                        ? [
                          <button className="pt-button pt-small pt-minimal pt-intent-danger pt-icon-undo" onClick={e => this.cancelTranslation(e)}></button>,
                          <button className="pt-button pt-small pt-minimal pt-intent-success pt-icon-tick-circle" onClick={e => this.saveTranslation(e)}></button>
                        ]
                        : <button className="pt-button pt-small pt-minimal pt-icon-edit" onClick={e => this.toggleTranslation(e, language_id, alt)}></button>
                      }
                    </div>
                  </div>
                  {
                    <div className="info-block">
                      <div className="block list" style={{margin: '0'}}>
                        { (selected === language_id) ?
                          <label className="fill">
                            <span>
                              <b className="label-row fixed-min-width">Alt: (no more than 16 words)</b>
                            </span>
                            <span className="label-row count-chars">{ translation.alt.length > 0 ? translation.alt.match(/\w+/g).length : 0 } words</span>
                            <span className="label-row count-chars">{ translation.alt.length } / { this.maxLength }</span>
                          </label>
                          : <b className="label-row fixed-min-width">Alt:</b>
                        }
                        {
                          (selected === language_id)
                          ? 
                            <textarea
                              style={{ flex: '1', height: '120px' }}
                              className="pt-input pt-minimal"
                              onChange={(e) => this.updateAlt(e.target.value)}
                              value={translation.alt}
                              maxlength={this.maxLength}
                              placeholder={alt}
                            />
                           : <div style={{wordBreak: 'break-all'}}>{alt}</div>
                        }
                      </div>
                    </div>
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  missingTranslations = () => {
    const { missingTranslations } = this.props;
    const { translation, selected } = this.state;
    return (
      <div className="row block">
        <div className="col-12">
          <b className="label-row">Translations Missing:</b>
          <ul className="list">
            { missingTranslations.map(({ id, locale, language }) => (
              <li key={`missing-translation-${language.locale}`}>
                <div className="list-item block">
                  <div className="row fill no-margin">
                    <span>
                      {language} <span className="pt-tag pt-minimal pt-intent-warning">{locale}</span>
                    </span>
                    <div className="actions">
                      { (selected === id)
                        ? [
                          <button className="pt-button pt-small pt-minimal pt-intent-danger pt-icon-undo" onClick={e => this.cancelTranslation(e)} />,
                          <button className="pt-button pt-small pt-minimal pt-intent-success pt-icon-tick-circle" onClick={e => this.saveTranslation(e)} />,
                        ]
                        : <button className="pt-button pt-small pt-minimal pt-icon-plus" onClick={e => this.toggleTranslation(e, id)} />
                      }
                    </div>
                  </div>
                  {
                    (selected === id)
                    ?
                      <div className="info-block">
                        <div className="block list" style={{margin: '0'}}>
                          <label className="fill">
                            <span>
                              <b className="label-row fixed-min-width">Alt: (no more than 16 words)</b>
                            </span>
                            <span className="label-row count-chars">{ translation.alt.length > 0 ? translation.alt.match(/\w+/g).length : 0 } words</span>
                            <span className="label-row count-chars">{ translation.alt.length } / { this.maxLength }</span>
                          </label>
                          
                          <textarea
                            style={{ flex: '1', height: '120px' }}
                            className="pt-input pt-minimal"
                            onChange={(e) => this.updateAlt(e.target.value)}
                            value={translation.alt}
                            maxlength={this.maxLength}
                            placeholder="Insert here Alt translation ..."
                          />
                        </div>
                      </div>
                    : null
                  }
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  onClipboardSuccess = () => {
    window.alert(`Copied Successfully \n ${this.props.file.src || this.props.file.original}`);
  }

  renderTranslations = () => {
    const { missingTranslations, translationsFound } = this.props;
    return [
      (translationsFound.length) ? this.existingTranslations() : null,
      (!missingTranslations.length) ? this.weAreGood() : this.missingTranslations(),
    ];
  }

  onNameChange = (e) => {
    this.setState({
      filename: e.target.value
    });
  }

  revertName = () => {
    const { file } = this.props;
    let filename = file ? file.filename : '';
    filename = filename.split('.')[0];

    this.setState({
      filename
    });
  }

  updateName = async () => {
    const { filename } = this.state;
    const { file, updateFileName } = this.props;
    const ext = (file ? file.filename : '').split('.').pop();

    this.setState({ isUpdatingName: true });
    if (file.filename !== filename) {
      await updateFileName({
        id: file.id,
        name: `${filename}.${ext}`,
        oldKey: file.key
      });
    }

    this.setState({ isUpdatingName: false });

  }

  render() {
    const { file } = this.props;
    const { filename, isUpdatingName } = this.state;

    return file ? (
      <Sidebar float hasOverlay>
        <Alert
          intent={Intent.DANGER}
          iconName="pt-icon-warning-sign"
          isOpen={this.state.removeWarning}
          confirmButtonText={"I'm sure!"}            
          cancelButtonText="Cancel"
          onConfirm={this.confirmRemoveFile}
          onCancel={this.closeRemoveWarning}
          >
          <span>Are you sure you want to delete?</span>
        </Alert>
        <div className="header">
          <h4>{ file && file.filename }</h4>

          <div className="actions">
            {
              (this.isImage) ? [
                <Action key="item-action-manipulate" icon="pt-icon-style" intent="pt-intent" action={e => this.handleClickEdit(e)} tooltip="Manipulate Picture" />,
              ] : null
            }
            <Action key="item-action-remove" icon="pt-icon-remove" intent="pt-intent-danger" action={e => this.alertRemoveFile(e)} tooltip="Delete File" />
          </div>

        </div>
        <div className="body">

          <div className="pt-card pt-elevation-0 space">
            <div className="row">
              <div className="col-12">
                <b className="label-row">Filename: </b>
                <input value={filename} name="name" onChange={(e) => this.onNameChange(e)} placeholder="Enter Name" className="pt-input pt-fill" type="text" />
                <Button type="button" className="pt-button pt-small pt-minimal pt-intent-danger pt-icon-undo" onClick={e => this.revertName(e)} />
                <Button type="button" className="pt-button pt-small pt-minimal pt-intent-success pt-icon-tick-circle" loading={isUpdatingName} onClick={e => this.updateName(e)} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Link:</b>
                <a href={file && (file.src || file.original)} target="_blank">
                  {file && (file.src || file.original)}
                </a>
                <Clipboard data-clipboard-text={file && (file.src || file.original)} button-class={cx("pt-button pt-minimal pt-icon-clipboard")} component="button" onSuccess={this.onClipboardSuccess} />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <b className="label-row">Size:</b>
                <span>{bytes(file.size || file.Size)}</span>
              </div>
            </div>
          </div>

          { (this.isImage) ? this.renderTranslations() : null }

        </div>
      </Sidebar>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { availableLocales } = state.runtime;


  console.log('MEDIA => ',state.media.media.media);
  const translationsFound = state.media.media.media ? state.media.media.media.translations.map(translation => translation) : [];
  const translationsFoundLocales = translationsFound.map(({language}) => language.locale);
  const allLanguagesLocales = Object.keys(availableLocales).map(locale => locale);
  
  const missingTranslations = _.difference(allLanguagesLocales, translationsFoundLocales).map(locale => ({
    id: availableLocales[locale].id,
    locale,
    language: availableLocales[locale].language,
  }));

  return {
    translationsFound,
    missingTranslations,
  };
};

const mapDispatchToProps = {
  updateOrCreateMediaTranslation,
  updateFileName
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(MediaCenterInspector));
