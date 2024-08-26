import React, { useEffect, useState } from 'react'
import $api from '../../api/http';

function TotalAvarage() {

    const [time, setTime] = useState("")

    const fetchTime = async () => {
        const res = await $api.get("/useractivities/average-time-spent");
        setTime(res.data);
    };

    useEffect(() => {
        fetchTime()
    }, [])


    if (time) {

        return (
            <h2>Avarage time: {time.toFixed(1)} min</h2>
        )
    }
    else {
        return (
            <h2>...</h2>
        )
    }

}

export default TotalAvarage