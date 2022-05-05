import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import axios from '../../../axiosinstance'
Chart.register(...registerables)

function BarChart() {
    const [turf, setTurf] = useState([])
    const [value, setValue] = useState([])
    const [data, setData] = useState([])

    const turfData = async () => {
        try {
            const data = await axios.get("admin_panel/turfs", {
                headers: {
                    'authToken': localStorage.getItem("admintoken"),
                }
            })
            setTurf(data.data.turf)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        const area = turf.map((data) => (data.location))
        const uniqueArea = [...new Set(area)]
        setValue(uniqueArea)
        const data = []
        let kakkanad = 0
        let kochi = 0
        area.filter((data) => {
            if (data === 'Kakkanad') {
                kakkanad++
            } else {
                kochi++
            }
        })
        data.push(kochi)
        data.push(kakkanad)
        setData(data)
    }, [turf])

    useEffect(() => {
        turfData();
    }, [])

    return (
        <div style={{ height: 240, width: 470 }}>
            <Bar data={{
                labels: value,
                datasets: [
                    {
                        label: 'Number of Turfs by Location',
                        data: data,
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

export default BarChart