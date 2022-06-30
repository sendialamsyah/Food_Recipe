import React from 'react'

const TextArea = ({name, id, value, cols, rows, placeholder, onChange}) => {
  return (
    <div>
        <textarea
            name={name}
            id={id}
            value={value}
            cols={cols}
            rows={rows}
            placeholder={placeholder}
            onChange={onChange}
          ></textarea>
    </div>
  )
}

export default TextArea