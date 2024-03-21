import React, { forwardRef } from 'react';

const Search = forwardRef((props, ref) => {
  return (
    <div className='cm-input'>
      <input
        type="text"
        className='cm-search-input'
        placeholder='Search Places..'
        onChange={props?.handleChange}
        value={props?.search}
        onKeyUp={props?.onKeyUp}
        ref={ref} // Forward the ref to the input element
      />
      <span>Ctrl + /</span>
    </div>
  );
});

export default Search;