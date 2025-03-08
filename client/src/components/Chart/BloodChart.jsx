import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserStore from "../../store/UsersStore.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BloodGroupChart = () => {
    const { BloodgrupeRequest, BloodGroupe } = UserStore();
    const [bloodGroupValues, setBloodGroupValues] = useState({
        "A+": '',
        "B+": '',
        "AB+": '',
        "O+": '',
        "A-": '',
        "B-": '',
        "AB-": '',
        "O-": ''
    });

    useEffect(() => {
        (async () => {
            await BloodgrupeRequest();
        
            if (Array.isArray(BloodGroupe)) {
                const updatedValues = { ...bloodGroupValues };
                BloodGroupe.forEach(bloodGroup => {
                    if (updatedValues[bloodGroup.GrpName] !== undefined) {
                        updatedValues[bloodGroup.GrpName] = bloodGroup.count;
                    }
                });
                setBloodGroupValues(updatedValues);
            } 
        })();
    }, [BloodGroupe]);
    

    const chartData = {
        labels: Object.keys(bloodGroupValues),
        datasets: [
            {
                data: Object.values(bloodGroupValues),
                backgroundColor: 'rgba(243,29,29,0.66)',
                borderRadius: 5, // ✅ Bar গুলোর কোনাগুলো গোলাকার হবে
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw + "+";
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: window.innerWidth < 600 ? 10 : 14,  // ✅ ছোট স্ক্রিনে text ছোট হবে
                    },
                    color: '#000',
                    maxRotation: 0, // ✅ Blood Group Text সোজা থাকবে
                    minRotation: 0,
                    autoSkip: false, // ✅ সব টেক্সট দেখানোর জন্য
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <div style={{ width: '95%', maxWidth: '900px', margin: 'auto', paddingTop: '10px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BloodGroupChart;
