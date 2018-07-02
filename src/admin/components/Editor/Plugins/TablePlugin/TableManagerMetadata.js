import React from "react";

import {HeaderStyle} from "./HeaderStyle";
import {Input} from "./FormComponents";


export function TableManagerMetadata({data, errors, onChange}) {

  return (<div>
      <Input title="Title"
        name="title"
        value={data.title}
        errors={errors.title}
        onChange={onChange} />

      <Input title="Source"
        name="source"
        value={data.source}
        onChange={onChange}
        isRequired={false} />

      <HeaderStyle name="headerStyle"
        selectedOptions={data.headerStyle}
        onChange={onChange}/>
    </div>);
}
