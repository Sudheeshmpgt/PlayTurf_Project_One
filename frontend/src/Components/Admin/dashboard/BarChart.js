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
        for (const unique of uniqueArea){
            let count = 0
            for (const ar of area){
                if(unique === ar){
                    count ++
                }
            }
            data.push(count)
        }
        setData(data)
    }, [turf])

    useEffect(() => {
        turfData();
    }, [])

    return (
        <div style={{width:'87%', margin:'5px auto'}}>
            <Bar 
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