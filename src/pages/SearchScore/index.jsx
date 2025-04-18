import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Card, CardContent, Box, Avatar, Alert } from '@mui/material';
import * as apiService from '../../apis/index';
import TopMenu from '../../components/header';

const SearchScore = () => {

    const [regNum, setRegNum] = useState();
    const [currentMember, setCurrentMember] = useState();
    const [enableAlert, setEnableAlert] = useState(false);
    const [alertContent, setAlertContent] = useState(false);

    const fetchData = async () => {
        try {
            const res = await apiService.scoreAPI.getStudentScoreByRegNum(regNum);
            console.log(res);
            if (res?.data) {

                setCurrentMember(res?.data)
                setEnableAlert(false);
            } else {
                alert(123);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setEnableAlert(true);
                setAlertContent(`Can not find student with registration number: ${regNum}`);
                console.error("Data not found (404):", err.message);
            } else {
                console.error("Error:", err);
            }
        }
    }

    const clearData = async () => {
        setCurrentMember(null);
        setRegNum("");
        setEnableAlert(false);
    }


    return (
        <>
            <Box>

                <Stack spacing={2}>
                    <Card sx={{ bgcolor: "#F3EFEA" }}>
                        <CardContent>
                            <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                                Search with Registrator Number
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Please enter the student's Registration Number in the field below to search for and display their academic exam results across all subjects.
                            </Typography>
                            {enableAlert && <Alert severity="warning">
                                {alertContent}
                            </Alert>}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                sx={{ my: 1, alignItems: { xs: 'stretch', sm: 'center' } }}
                            >
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    value={regNum}
                                    onChange={(e) => setRegNum(e.target.value)}
                                    placeholder="Enter here..."
                                    fullWidth
                                    sx={{
                                        input: { color: '#000' },
                                        backgroundColor: '#fff',
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#000',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#555',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#000',
                                            },
                                        },
                                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                        '& input[type="number"]': {
                                            MozAppearance: 'textfield',
                                        },
                                    }}
                                    inputProps={{
                                        type: 'number',
                                        onInput: (e) => {
                                            if (isNaN(e.target.value)) {
                                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                            }
                                        },
                                        min: "0",
                                        step: "1",
                                        pattern: '[0-9]*',

                                    }}

                                />


                                <Button
                                    variant="contained"
                                    onClick={fetchData}
                                    sx={{
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: '#333',
                                        },
                                    }}
                                >
                                    Search
                                </Button>

                                <Button
                                    variant="outlined"
                                    onClick={clearData}
                                    color="error"
                                >
                                    Clear
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card sx={{ bgcolor: "#F3EFEA" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                                Search Result
                            </Typography>

                            {currentMember ? (
                                <>
                                    <Typography mb={1}><i>Registration Number: </i><b>{currentMember.sbd}</b></Typography>
                                    <TableContainer component={Paper} sx={{ boxShadow: 'none', borderRadius: 5 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ backgroundColor: '#e0f0ff' }}>
                                                    {[
                                                        'Math',
                                                        'Literature',
                                                        'Foreign Language',
                                                        'Physics',
                                                        'Chemistry',
                                                        'Biology',
                                                        'History',
                                                        'Geography',
                                                        'Civic Education',
                                                        'Language Code',
                                                    ].map((title, index) => (
                                                        <TableCell
                                                            key={index}
                                                            sx={{
                                                                borderRight: index !== 9 ? '1px solid #ccc' : 'none',
                                                                fontWeight: 'bold',
                                                                color: '#003366',
                                                            }}
                                                        >
                                                            {title}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                <TableRow>
                                                    {[
                                                        currentMember.toan,
                                                        currentMember.nguVan,
                                                        currentMember.ngoaiNgu,
                                                        currentMember.vatLi,
                                                        currentMember.hoaHoc,
                                                        currentMember.sinhHoc,
                                                        currentMember.lichSu,
                                                        currentMember.diaLy,
                                                        currentMember.gdcd,
                                                        currentMember.maNgoaiNgu,
                                                    ].map((value, index) => (
                                                        <TableCell
                                                            key={index}
                                                            sx={{
                                                                borderRight: index !== 9 ? '1px solid #ccc' : 'none',
                                                                backgroundColor: index % 2 === 0 ? '#f7f9fb' : '#ffffff',
                                                                fontStyle: value ? 'normal' : 'italic',
                                                                color: value ? 'inherit' : '#888',
                                                            }}
                                                        >
                                                            {value || 'N/A'}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </>


                            ) : (
                                <Typography color="text.secondary">No data available</Typography>
                            )}
                        </CardContent>
                    </Card>

                </Stack>



            </Box>
        </>

    );
}

export default SearchScore;