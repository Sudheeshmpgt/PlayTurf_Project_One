import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from '../../../axiosinstance'
Chart.register(...registerables)

function LineChart() {
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

        const order = booking.map((data) => (data.status))
        const uniqueOrder = [...new Set(order)]
        setValue(uniqueOrder)
        const data = []
        for (const unique of uniqueOrder) {
            let count = 0
            for (const ord of order) {
                if (unique === ord) {
                    count++
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
        <div style={{ width: '87%', margin: '5px auto' }}>
            <Line
                options={{
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 1,
                            },
                            beginAtZero:true,
                        }
                    },
                }}
                data={{
                    labels: value,
                    datasets: [
                        {
                            label: 'Bookings by Category',
                            data: datas,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 159, 64, 0.8)'
                            ],
                            borderColor: 'rgba(255, 206, 86, 1)'
                        },
                    ],

                }} />
        </div>
    )
}

export default LineChart