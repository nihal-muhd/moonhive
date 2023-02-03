import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import './Graph.css'

const Graph = () => {
  const [barData, setBarData] = useState([])
  useEffect(() => {
    async function getGraphData () {
      const res = await axios.get('http://localhost:5000/admin/get-graph-data', { withCredentials: true })
      setBarData(res.data)
    }
    getGraphData()
  }, [])

  const data = {
    labels: barData.map((v) => v.name),
    datasets: [
      {
        label: 'Number of pending task',
        backgroundColor: ['#007D9C', '#F7E018'],
        borderColor: 'rgb(0,0,255)',
        data: barData.map((v) => v.numberoftask)
      }
    ]
  }
  return (
    <div className='graph'>
      <Pie data={data} />
    </div>
  )
}

export default Graph
