import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from '../../../axiosinstance'
Chart.register(...registerables)

function DoughnutChart() {
    const [user, setUser] = useState([])
    const [value, setValue] = useState([])
    const [datas, setDatas] = useState([])

    const userD = async () => {
        try {
            const data = await axios.get("admin_panel/user_management",
                {
                    headers: {
                        'authToken': localStorage.getItem("admintoken")
                    }
                })
            setUser(data.data.user)
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        const data = []
        let active = 0
        let notActive = 0
        user.filter((data) => {
            if (data.isActive) {
                active++
            } else {
                notActive++
            }
        })
        data.push(active)
        data.push(notActive)
        setDatas(data)
    }, [user])

    useEffect(() => {
        userD();
    }, [])

    return (
        <div style={{ width: 310 }}>
            <Doughnut data={{
                labels: ['UnBlocked', 'Blocked'],
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

export default DoughnutChart