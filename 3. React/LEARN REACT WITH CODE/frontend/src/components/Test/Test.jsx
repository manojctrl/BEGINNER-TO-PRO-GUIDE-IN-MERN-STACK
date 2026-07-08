import React from 'react'

const Test = () => {
    const [checked, toggle ] = React.useReducer((state) => !state, false)
  return (
    <div>
      <input  type='checkbox' checked={checked} onChange={toggle} />
      {checked ? <h1>Checked</h1> : <h1>Not Checked</h1>}
    </div>

  )
}

export default Test
