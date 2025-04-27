import React from 'react'

const CustomLoader = () => {
  return (
    <>
       <div id="wifi-loader">
  <svg className="circle-outer" viewBox="0 0 86 86">
    <circle className="back" cx={43} cy={43} r={40} />
    <circle className="front" cx={43} cy={43} r={40} />
    <circle className="new" cx={43} cy={43} r={40} />
  </svg>
  <svg className="circle-middle" viewBox="0 0 60 60">
    <circle className="back" cx={30} cy={30} r={27} />
    <circle className="front" cx={30} cy={30} r={27} />
  </svg>
  <svg className="circle-inner" viewBox="0 0 34 34">
    <circle className="back" cx={17} cy={17} r={14} />
    <circle className="front" cx={17} cy={17} r={14} />
  </svg>
  <div className="text" data-text="loading...." />
</div>

    </>
  )
}

export default CustomLoader