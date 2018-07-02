import React, { Component } from 'react';
import Text from '../../../Primitives/Text';
import FixedRatioImage from "../../../Primitives/FixedRatioImage";
import Link from "../../../Primitives/Link";
import DraftjsDecoder from 'utils/DraftjsDecoder';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';
import s from './AlsoInteresting.css';
import ai1 from './gfx/also-interesting-1.png';
import ai2 from './gfx/also-interesting-2.png';
import ai3 from './gfx/also-interesting-3.png';

export class AlsoInteresting extends Component {

  text_truncate = (str, length = 180, ending = '...') => {    
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

  refine_summary = (summary) => {
    let temp = JSON.parse(summary);
    if(temp.blocks){
      let text = temp.blocks[0].text;
      for(let i = 1; i < temp.blocks.length; i++){
        if(text.length > 180) break;        
        text += '\n' + temp.blocks[i].text;        
      }
      temp.blocks[0].data = {};
      temp.blocks[0].type = 'unstyled';      
      temp.blocks[0].text = this.text_truncate(text);
      temp.blocks = [temp.blocks[0]];      
    }      
    return JSON.stringify(temp);
  }

  render() {
    const { posts } = this.props;
    
    return (
      
      <div className="container lj-pad-y-50">
        <div className="row">
          <div className="col">
            <h2 className="section-title lt-blue">
              <Text id="client.home.alsoInteresting" defaultMessage="Also Interesting" />
            </h2>
          </div>
        </div>
        <div className="row my-5">
          {posts.map((post, index) => (
            <div className={cx('col-sm-4 col-12 my-3')} style={{ "word-break": "break-all" }} key={`index-${index}`}>
              <Link to={`/article/${post.slug}`} >
                <FixedRatioImage ratio={0.8} image={{src: post.image}} alt={`${post.title}`} />
                {post.title && 
                  (<h2 className="d-flex my-4">
                    <Text defaultMessage={post.title} id={`client.home.alsoInteresting.title${index}`} />
                  </h2>)
                }
                {post.summary && 
                  (<span className="d-flex corporate-blue">
				            <DraftjsDecoder contentState={this.refine_summary(post.summary)} />
                  </span>)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default (withStyles(s)(AlsoInteresting));
