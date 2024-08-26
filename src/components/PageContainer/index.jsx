import React, { useState } from 'react'

function PageContainer({ children }) {


    return (
        <div style={{ padding: "20px", width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>{children}
        </div>
    )
}

export default PageContainer