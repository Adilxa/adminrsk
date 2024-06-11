import React from 'react'

function PageContainer({ children }) {
    return (
        <div style={{ padding: "20px", width: "100%", height: "100%" }}>{children}</div>
    )
}

export default PageContainer