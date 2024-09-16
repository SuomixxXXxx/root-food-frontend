import React from 'react';

export const TextField = (props) => {
    const {placeholder} = props;
    return (
        <div>
            <input type="text" placeholder={placeholder} style={{ borderRadius: '10px', marginLeft:"2em",marginRight:"2em", width:"200px"}}
                   className="input input-bordered w-full max-w-xs pl-4  border-2 border-[#475569] "/>
        </div>
    )
};