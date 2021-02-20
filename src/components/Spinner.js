import React from 'react'

function Spinner({height,width,borderTop,border,message}) {
    return (
        <div className="spinner-container">
            <div style={{ height: height||'100%', width: width||'100%',background:"transparent",borderColor:`${borderTop} ${border} ${border} ${border}`||"black white white white" }} className="spinner">
            </div>
            <p style={{color:border||"white"}}>{message||"Loading..."}</p>
        </div>
    )
}

export default Spinner
