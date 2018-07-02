import React from 'react';
import ReactPlayer from 'react-player';
import cx from 'classnames';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import VisibilitySensor from 'react-visibility-sensor';
import {
  Maximize,
  Maximize2,
  Play,
  Pause,
  Volume1,
  VolumeX,
} from 'react-feather';
import s from './style.css';

class Video extends React.Component {
  state = {
    playing: false,
    muted: true,
    volume: 0.5,
    controls: false,
    isFullscreen: false,
  };

  ref = (player) => {
    this.player = player;
  };

  play = (e) => {
    e.preventDefault();
    this.setState({ playing: true });
    console.log('play');
  };

  pause = (e) => {
    e.preventDefault();
    this.setState({ playing: false });
    console.log('pause');
  };

  mute = (e) => {
    e.preventDefault();
    this.setState({ muted: true });
    console.log('mute');
  };

  unmute = (e) => {
    e.preventDefault();
    this.setState({ muted: false });
    console.log('unmute');
  };

  onPlay = () => {
    console.log('onPlay');
    this.setState({ playing: true });
  };

  onPause = () => {
    console.log('onPause');
    this.setState({ playing: false });
  };

  onSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  onSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  onSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  onEnded = () => {
    console.log('onEnded');
    this.setState({ playing: this.state.loop });
  };

  onDuration = (duration) => {
    console.log('onDuration', duration);
    this.setState({ duration });
  };

  isVisible = (isVisible) => {
    this.setState({
      playing: isVisible,
    });
  };

  checkIfFullScreen = (some) => {
    console.log('on change screenfull', some);
    const isFullscreen = some.isFullscreen;
    this.setState({
      isFullscreen,
      controls: isFullscreen,
    });
  };

  componentDidMount() {
    // CAUSE OF IPHONE NOT LOADING
    // screenfull.onchange(this.checkIfFullScreen);
  }

  maximize = (e) => {
    e.preventDefault();
    screenfull.request(findDOMNode(this.player));
  };

  minimize = (e) => {
    e.preventDefault();
    screenfull.exit();
  };

  fullScreenIcon = () => {
    if (!this.state.isFullscreen) {
      return (
        <button
          className={cx(s.controls, s.fullscreen)}
          onClick={this.maximize}
        >
          <Maximize2 color="#FFFFFF" />
        </button>
      );
    }
    return (
      <button className={cx(s.controls, s.fullscreen)} onClick={this.minimize}>
        <Maximize color="#FFFFFF" />
      </button>
    );
  };

  playPauseIcon = () => {
    if (!this.state.playing) {
      return (
        <button className={cx(s.controls, s.playPause)} onClick={this.play}>
          <Play color="#FFFFFF" />
        </button>
      );
    }
    return (
      <button className={cx(s.controls, s.playPause)} onClick={this.pause}>
        <Pause color="#FFFFFF" />
      </button>
    );
  };

  volumeIcon = () => {
    if (!this.state.muted) {
      return (
        <button className={cx(s.controls, s.volume)} onClick={this.mute}>
          <VolumeX color="#FFFFFF" />
        </button>
      );
    }
    return (
      <button className={cx(s.controls, s.volume)} onClick={this.unmute}>
        <Volume1 color="#FFFFFF" />
      </button>
    );
  };

  render() {
    const {
      source, height, width, border, id,
    } = this.props;
    const {
      playing, controls, muted, isFullscreen,
    } = this.state;

    return (
      <div
        className={cx(
          s.player,
          isFullscreen ? s.fullscreen : null,
          playing ? s.paused : s.playing,
          border ? s.border : null,
        )}
      >
        {this.fullScreenIcon()}
        {this.playPauseIcon()}
        {this.volumeIcon()}

        <VisibilitySensor onChange={this.isVisible}>
          <ReactPlayer
            ref={this.ref}
            className={cx('embed-responsive embed-responsive-16by9')}
            id={id}
            url={source}
            playing={playing}
            muted={muted}
            width={width}
            height={height}
            controls={controls}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onEnded={this.onEnded}
            onError={e => console.log('onError', e)}
            onDuration={this.onDuration}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
        </VisibilitySensor>
      </div>
    );
  }
}

Video.propTypes = {
  source: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

Video.defaultProps = {
  source: undefined,
  height: '100%',
  width: '100%',
};

export default withStyles(s)(Video);
