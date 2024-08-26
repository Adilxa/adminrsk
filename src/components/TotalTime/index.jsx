import React, { useEffect, useState } from 'react'
import $api from '../../api/http';

function TotalTime() {

    const [time, setTime] = useState("")

    const fetchTime = async () => {
        const res = await $api.get("/useractivities/total-time-spent");
        setTime(res.data);
    };

    useEffect(() => {
        fetchTime()
    }, [])


    if (time) {

        return (
            <h2>Total time: {time} hour</h2>
        )
    }
    else {
        return (
            <h2>...</h2>
        )
    }

}

export default TotalTime