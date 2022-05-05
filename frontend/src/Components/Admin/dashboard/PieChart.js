import React, { useState, useEffect } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from '../../../axiosinstance'
Chart.register(...registerables)

function PieChart() {

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

        const payment = booking.map((data) => (data.paymentMode))
        const uniqueMode = [...new Set(payment)]
        setValue(uniqueMode)
        const data = []
        let COV = 0
        let OP = 0
        payment.filter((data) => {
            if (data === 'Pay At Venue') {
                COV++
            } else {
                OP++
            }
        })
        data.push(OP)
        data.push(COV)
        setDatas(data)
    }, [booking])

    useEffect(() => {
        bookingData();
    }, [])

    return (
        <div style={{ width: 310 }}>
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

export default PieChart