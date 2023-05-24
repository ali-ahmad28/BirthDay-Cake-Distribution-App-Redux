import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import React from 'react'
import { useSelector } from 'react-redux';


const PieChartComponent = () => {

    const myState = useSelector(state => state.InputDataReducer)
    const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF"];
    const pieData = [
        {
            name: "Small Cake",
            value: myState.smallCakes
        },
        {
            name: "Large Cake",
            value: myState.largeCakes
        }
    ];
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "#ffff",
                        padding: "5px",
                        border: "1px solid #cccc"
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}`}</label>
                </div>
            );
        }
        return null;
    };
    return (
        <PieChart width={730} height={300}>
            <Pie
                data={pieData}
                color="#000000"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
            >
                {pieData.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
        </PieChart>
    );
}

export default PieChartComponent;
