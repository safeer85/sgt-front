// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        moduleName: '',
        grade: '',
        term: ''
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentGradeId, setCurrentGradeId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate(); //
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume the token is stored in local storage
                if (token) {
                    const userResponse = await axios.get('http://localhost:5000/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserName(userResponse.data);
                }

                const gradesResponse = await axios.get('http://localhost:5000/api/grades', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setGrades(gradesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Run once on component mount

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assume the token is stored in local storage

            if (isEditMode) {
                // Update grade
                const response = await axios.put(`http://localhost:5000/api/grades/${currentGradeId}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setGrades(grades.map(grade => grade._id === currentGradeId ? response.data : grade)); // Update the grades state with the edited grade
            } else {
                // Add new grade
                const response = await axios.post('http://localhost:5000/api/grades', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setGrades([...grades, response.data]); // Update the grades state with the new grade
            }

            setFormData({ moduleName: '', grade: '', term: '' }); // Reset the form
            setIsEditMode(false);
            setCurrentGradeId(null);
            setIsFormVisible(false); // Hide the form after submitting

        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'adding'} grade:`, error);
            setError(`Error ${isEditMode ? 'updating' : 'adding'} grade. Please try again later.`);
        }
    };

    const handleDelete = async (gradeId) => {
        try {
            const token = localStorage.getItem('token'); // Assume the token is stored in local storage
            await axios.delete(`http://localhost:5000/api/grades/${gradeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setGrades(grades.filter(grade => grade._id !== gradeId)); // Remove the deleted grade from state
        } catch (error) {
            console.error('Error deleting grade:', error);
            setError('Error deleting grade. Please try again later.');
        }
    };

    const handleEdit = (grade) => {
        setFormData({ moduleName: grade.moduleName, grade: grade.grade, term: grade.term });
        setIsEditMode(true);
        setCurrentGradeId(grade._id);
        setIsFormVisible(true); // Show the form when editing
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Prepare data for the chart
    const modules = [...new Set(grades.map(grade => grade.moduleName))];

    const chartData = {
        labels: modules,
        datasets: Array.from({ length: 6 }, (_, term) => ({
            label: `Term ${term + 1}`,
            data: modules.map(module => {
                const grade = grades.find(g => g.moduleName === module && g.term === term + 1);
                return grade ? grade.grade : 0;
            }),
            backgroundColor: `rgba(${75 + term * 30}, ${192 - term * 30}, 192, 0.2)`,
            borderColor: `rgba(${75 + term * 30}, ${192 - term * 30}, 192, 1)`,
            borderWidth: 1,
        })),
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
        maintainAspectRatio: false, // Allows chart resizing
    };

    // Group grades by term
    const gradesByTerm = grades.reduce((acc, grade) => {
        if (!acc[grade.term]) {
            acc[grade.term] = [];
        }
        acc[grade.term].push(grade);
        return acc;
    }, {});

    return (
        <div className="dashboard-container">
            <h1>Student Grades Dashboard</h1>
            <h1>Hello, {userName.name}</h1>
            
            <div className="chart-container">
                <Bar data={chartData} options={options} />
            </div>
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide Form' : 'Add Grade'}
            </button>
            {isFormVisible && (
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Subject:</label>
                        <input
                            type="text"
                            name="moduleName"
                            value={formData.moduleName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Grade:</label>
                        <input
                            type="number"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Term:</label>
                        <select name="term" value={formData.term} onChange={handleChange} required>
                            <option value="">Select Term</option>
                            {Array.from({ length: 6 }, (_, i) => (
                                <option key={i} value={i + 1}>{`Term ${i + 1}`}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">{isEditMode ? 'Update Grade' : 'Add Grade'}</button>
                </form>
            )}
            <button onClick={() => navigate('/ranks')}>
                View Rank
            </button>
            {grades.length > 0 ? (
                Object.keys(gradesByTerm).map(term => (
                    <div key={term}>
                        <h2>Term {term}</h2>
                        <table className="grades-table">
                            <thead>
                                <tr>
                                    <th>Module</th>
                                    <th>Grade</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gradesByTerm[term].map((grade) => (
                                    <tr key={grade._id}>
                                        <td>{grade.moduleName}</td>
                                        <td>{grade.grade}</td>
                                        <td>
                                            <button onClick={() => handleEdit(grade)}>Edit</button>
                                            <button onClick={() => handleDelete(grade._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p>No grades available.</p>
            )}
        </div>
    );
};

export default Dashboard;
