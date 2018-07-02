import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import HeaderOneEditor from "../EditorComponents/HeaderOneEditor";
import HeaderTwoEditor from "../EditorComponents/HeaderTwoEditor";
import HeaderThreeEditor from "../EditorComponents/HeaderThreeEditor";
import HeaderFourEditor from "../EditorComponents/HeaderFourEditor";
import HeaderFiveEditor from "../EditorComponents/HeaderFiveEditor";
import HeaderSixEditor from "../EditorComponents/HeaderSixEditor";
import ParagraphEditor from "../EditorComponents/ParagraphEditor";
import UnorderedListEditor from "../EditorComponents/UnorderedListEditor";
import OrderedListEditor from "../EditorComponents/OrderedListEditor";
import BlockquoteEditor from "../EditorComponents/BlockquoteEditor";
import s from "themes/lunajets/theme.css"; // WORKAROUND
import Image from "themes/lunajets/components/Primitives/Image"; // WORKAROUND
import Video from "themes/lunajets/components/Primitives/Video"; // WORKAROUND
import SectionTitle from "themes/lunajets/components/Layout/SectionTitle"; // WORKAROUND
import Row from 'themes/lunajets/components/Layout/Row';
import Column from 'themes/lunajets/components/Layout/Column';
import { generateKey } from "./generateKey";
import loadAttributesList from "./loadAttributesList";
import d from "./DraftjsDecoder.css";

class DraftjsDecoder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { contentState, customStyles, ...otherProps } = this.props;
    let content = null;
    try {
      content = JSON.parse(contentState);      
    } catch (e) {
      content = null;
    }
    let unorderedList = [];
    let orderedList = [];
    return (
      <div {...otherProps}>
        {content && content.blocks
          ? content.blocks.map((item, index) => {
              const itemData = {
                key: item.key,
                text: item.text,
                type: item.type,
                inlineStyles: item.inlineStyleRanges,
                entityRanges: item.entityRanges,
                depth: item.depth,
                data: item.data,
              };
              const listComponents = loadAttributesList(
                itemData.text,
                itemData.inlineStyles,
                itemData.entityRanges,
                content.entityMap,
              );
              if (item.type === "unordered-list-item") {
                unorderedList.push(listComponents);
                if (!content.blocks[index + 1] || content.blocks[index + 1].type !== "unordered-list-item") {
                  const aLiList = unorderedList;
                  unorderedList = [];
                  return <UnorderedListEditor key={generateKey()} listLi={aLiList} />;
                }
              }
              if (item.type === "ordered-list-item") {
                orderedList.push(listComponents);
                if (!content.blocks[index + 1] || content.blocks[index + 1].type !== "ordered-list-item") {
                  const aLiList = orderedList;
                  orderedList = [];
                  return <OrderedListEditor key={generateKey()} listLi={aLiList} />;
                }
              }
              switch (item.type) {
                case "unstyled": {
                  if (item.text === "") {
                    return <br key={generateKey()} />;
                  } else {
                    return <ParagraphEditor key={generateKey()} listComponents={listComponents} />;
                  }
                }
                case "paragraph": {
                  return <ParagraphEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "header-one": {
                  return <HeaderOneEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "header-two": {
                  return <HeaderTwoEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "header-three": {
                  return <HeaderThreeEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "header-four": {
                  return <HeaderFourEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "header-five": {
                  return <HeaderFiveEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "header-six": {
                  return <HeaderSixEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "blockquote": {
                  return <BlockquoteEditor key={generateKey()} listComponents={listComponents} />;
                }
                case "atomic": {
                  if (itemData.data.type === "image") {
                    let width = "100%";
                    let height = "100%";
                    if (itemData.data.display === "medium") {
                      width = "60%";
                      height = "60%";
                    }
                    if (itemData.data.display === "small") {
                      width = "30%";
                      height = "30%";
                    }

                    return (
                      <Image
                        key={generateKey()}
                        source={itemData.data.src}
                        width={width}
                        height={height}
                        title={itemData.data.caption}
                        alt={itemData.data.rightsHolder}
                      />);
                  }
                  else if (itemData.data.type === "image-customized") {
                    let width = "100%";
                    let height = "100%";
                    if (itemData.data.display === "medium") {
                      width = "60%";
                      height = "60%";
                    }
                    if (itemData.data.display === "small") {
                      width = "30%";
                      height = "30%";
                    }
                    return (
                      <Image
                        key={generateKey()}
                        source={itemData.data.src}
                        width={width}
                        height={height}
                        title={itemData.data.title}
                        alt={itemData.data.alt}
                      />
                    );
                  }
                  else if (itemData.data.type === "video") {
                    let width = "100%";
                    let height = "100%";
                    if (itemData.data.display === "medium") {
                      width = "60%";
                      height = "60%";
                    }
                    if (itemData.data.display === "small") {
                      width = "30%";
                      height = "30%";
                    }
                    return (
                      <Video
                        key={generateKey()}
                        width={width}
                        height={height}
                        playing={false}
                        source={itemData.data.src}
                      />
                    );
                  }
                  else if (itemData.data.type === "section-title") {
                    return <SectionTitle textId={itemData.data.textId} />;
                  }
                  else if (itemData.data.type === "table-plugin") {
                    // console.log(listComponents, itemData.data.rows)                    
                    return itemData.data.rows.map(row =>{
                      {
                        const columns = row.map(column=><Column children={column} className="p-3" style={{display: 'flex', height: 'auto', width: '100%', 'word-break': 'break-word'}}/>);                       
                        return <Row children={columns} style={{display: 'flex', height: 'auto', width: '100%'}}/>                        
                      }
                    });                    
                  }
                }
              }
            })
          : null}
      </div>
    );
  }
}

export default withStyles(s)(DraftjsDecoder);
