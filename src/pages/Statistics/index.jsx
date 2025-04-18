import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    AreaChart, Area
} from 'recharts';
import {
    TextField, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography, Stack, Card, CardContent,
    FormControl, InputLabel, Select, MenuItem,
    Grid
} from '@mui/material';
import * as apiService from '../../apis/index';

const subjectOptions = [
    { value: "toan", label: "Math" },
    { value: "ngu_van", label: "Literature" },
    { value: "ngoai_ngu", label: "Foreign Language" },
    { value: "vat_li", label: "Physics" },
    { value: "hoa_hoc", label: "Chemistry" },
    { value: "sinh_hoc", label: "Biology" },
    { value: "lich_su", label: "History" },
    { value: "dia_li", label: "Geography" },
    { value: "gdcd", label: "Civic Education" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [statisticData, setStatisticData] = useState();
    const [formattedStatisticData, setFormattedStatisticData] = useState();
    const [percentChartData, setPercentChartData] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);

    const handleChange = (event) => {
        setSelectedSubject(event.target.value);
        fetchData(event.target.value);
    };

    const fetchData = async (subject) => {
        try {
            const res = await apiService.scoreAPI.getStatistic(subject);
            if (res?.data) {
                const total = res.data.greaterThan8 + res.data.between6And8 + res.data.between4And6 + res.data.lessThan4;

                const percentData = [
                    { name: "≥ 8", value: res.data.greaterThan8, percent: (res.data.greaterThan8 / total * 100).toFixed(1) },
                    { name: "6 - 8", value: res.data.between6And8, percent: (res.data.between6And8 / total * 100).toFixed(1) },
                    { name: "4 - 6", value: res.data.between4And6, percent: (res.data.between4And6 / total * 100).toFixed(1) },
                    { name: "< 4", value: res.data.lessThan4, percent: (res.data.lessThan4 / total * 100).toFixed(1) },
                ];

                setStatisticData(res.data);
                setTotalStudents(total);
                setPercentChartData(percentData);
                setFormattedStatisticData([
                    { name: "≥ 8", Students: res.data.greaterThan8 },
                    { name: "6 - 8", Students: res.data.between6And8 },
                    { name: "4 - 6", Students: res.data.between4And6 },
                    { name: "< 4", Students: res.data.lessThan4 },
                ]);
            } else {
                alert("Không có dữ liệu");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Stack spacing={2} m={2}>
                <Card sx={{ bgcolor: "#F3EFEA" }}>
                    <CardContent>
                        <Typography variant="h5" mb={2} fontWeight={'bold'} gutterBottom>
                            Statistics
                        </Typography>
                        <Typography variant="body1" mb={2} gutterBottom>
                            A visual overview of student performance in different subjects, featuring bar, pie, and area charts. It displays the distribution of scores across various ranges, total student counts, and percentage breakdowns.
                        </Typography>
                        <FormControl fullWidth size="small">
                            <InputLabel
                                id="subject-select-label"
                                sx={{ color: '#000' }}
                            >
                                Select Subject
                            </InputLabel>
                            <Select
                                labelId="subject-select-label"
                                value={selectedSubject}
                                label="Select Subject"
                                onChange={handleChange}
                                sx={{
                                    color: '#000',
                                    backgroundColor: '#fff',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#000',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#555',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#000',
                                    },
                                }}
                            >
                                {subjectOptions.map((subject) => (
                                    <MenuItem key={subject.value} value={subject.value}>
                                        {subject.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
                {formattedStatisticData && (
                    <Grid container spacing={2}>
                        <Grid size={{ lg: 6, md: 12 }}>
                            <Card sx={{ bgcolor: "#F3EFEA" }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2} fontWeight={650} gutterBottom>
                                        Bar Chart
                                    </Typography>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={formattedStatisticData}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="Students" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ lg: 6, md: 12 }}>
                            <Card sx={{ bgcolor: "#F3EFEA" }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2} fontWeight={650} gutterBottom>
                                        Pie Chart
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={percentChartData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label={({ name, percent }) => `${name}: ${(percent)}%`}
                                            >
                                                {percentChartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ lg: 6, md: 12 }}>
                            <Card sx={{ bgcolor: "#F3EFEA" }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2} fontWeight={650} gutterBottom>
                                        Horizontal Bar Chart
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart layout="vertical" data={formattedStatisticData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis type="category" dataKey="name" />
                                            <Tooltip />
                                            <Bar dataKey="Students" fill="#82ca9d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{ lg: 6, md: 12 }}>
                            <Card sx={{ bgcolor: "#F3EFEA" }}>
                                <CardContent>
                                    <Typography variant="h6" mb={2} fontWeight={650} gutterBottom>
                                        Area Chart
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={250}>
                                        <AreaChart data={formattedStatisticData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="monotone" dataKey="Students" stroke="#8884d8" fill="#8884d8" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </Stack>
        </div>
    );
};

export default Statistics;
