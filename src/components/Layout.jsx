import React,{ Fragment } from 'react'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div className="bg-[#E7E7E7]">
        {
          children
        }
      </div>
    </Fragment>
  )
}

export default Layout