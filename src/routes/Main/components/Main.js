import React from 'react'

export const Main = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Main</h2>
    <button className='btn btn-default' onClick={props.loadData}>
      Load Data
    </button>
  </div>
)

Main.propTypes = {
  loadData : React.PropTypes.func.isRequired,
}

export default Main
