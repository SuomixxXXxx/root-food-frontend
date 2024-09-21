import { Input } from '@material-tailwind/react';
import React from 'react';

export const TextField = ({placeholder}) => {
    
    return (
        <div className='flex items-center w-72 mb-4' >
            <Input type="text"  label={placeholder}  
                   className="input input-bordered w-full max-w-xs pl-4  border border-[#475569] rounded  "/>
        </div>
    )
};