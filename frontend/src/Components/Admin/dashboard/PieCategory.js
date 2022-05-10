import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from '../../../axiosinstance'
Chart.register(...registerables)

function PieCategory() {
    const [booking, setBooking] = useState([])
    const [value, setValue] = useState([])
    const [datas, setDatas] = useState([])

    const bookingData = async () => {
        try {
            const data = await axios.get("/admin_panel/booking",
                {
                    headers: {
                        'authToken': localStorage.getItem("admintoken")
                    }
                })
            setBooking(data.data.booking)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {

        const category = booking.map((data) => (data.turfDetails[0].category))
        const uniqueCategory = [...new Set(category)]
        setValue(uniqueCategory)
        const data = []
        for (const unique of uniqueCategory){
            let count = 0
            for (const cat of category){
                if(unique === cat){
                    count ++
                }
            }
            data.push(count)
        }
        setDatas(data)
    }, [booking])

    useEffect(() => {
        bookingData();
    }, [])

    return (
        <div style={{ width:'83%', margin:'3px auto' }}> 
            <Pie data={{
                labels: value,
                datasets: [
                    {
                        label: 'Bookings by Category',
                        data: datas,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 159, 64, 0.8)'
                        ]
                    }
                ]
            }} />
        </div>
    )
}

export default PieCategory