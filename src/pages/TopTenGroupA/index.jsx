import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Stack, Card, CardContent } from '@mui/material';
import * as apiService from '../../apis/index';

const TopTenGroupA = () => {

    const [regNum, setRegNum] = useState();
    const [currentMembers, setCurrentMembers] = useState();

    useEffect(() => {

        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const res = await apiService.scoreAPI.getTopTenGroupA();
            if (res?.data) {

                setCurrentMembers(res?.data)
            }
        } catch (err) {
           
        }
    }




    return (
        <div>
            <Stack spacing={2} m={2}>
                <Card sx={{ bgcolor: "#F3EFEA" }}>
                    <CardContent>
                        <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                            Top 10 students of group A
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Retrieve the top 10 students in Group A based on the highest total scores in Math, Physics, and Chemistry. This ranking allows quick identification of top academic performers in the science-focused subjects.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ bgcolor: "#F3EFEA" }}>
                    <CardContent>
                        <Typography variant="h6" fontWeight={'bold'} gutterBottom>
                            Leader Board
                        </Typography>

                        {currentMembers ? (
                            <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#e0f0ff' }}>
                                        {[
                                            'Registrator Number',
                                            'Math',
                                            'Physics',
                                            'Chemistry'
                                        ].map((title, index) => (
                                            <TableCell
                                                key={index}
                                                sx={{
                                                    borderRight: index !== 3 ? '1px solid #ccc' : 'none',
                                                    fontWeight: 'bold',
                                                    color: index === 0 ? '#ffffff' : '#003366',
                                                    backgroundColor: index === 0 ? '#1565c0' : 'inherit',
                                                }}
                                            >
                                                {title}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentMembers.map((currentMember, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {[
                                                currentMember.sbd,
                                                currentMember.toan,
                                                currentMember.vatLi,
                                                currentMember.hoaHoc,
                                            ].map((value, colIndex) => (
                                                <TableCell
                                                    key={colIndex}
                                                    sx={{
                                                        borderRight: colIndex !== 3 ? '1px solid #ccc' : 'none',
                                                        backgroundColor: colIndex === 0
                                                            ? '#e3f2fd'
                                                            : colIndex % 2 === 0
                                                            ? '#f7f9fb'
                                                            : '#ffffff',
                                                        fontWeight: colIndex === 0 ? 'bold' : 'normal',
                                                        color: value ? (colIndex === 0 ? '#0d47a1' : 'inherit') : '#888',
                                                        fontStyle: value ? 'normal' : 'italic',
                                                    }}
                                                >
                                                    {value || 'N/A'}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                        ) : (
                            <Typography color="text.secondary">Không có dữ liệu</Typography>
                        )}
                    </CardContent>
                </Card>
            </Stack>



        </div>
    );
}

export default TopTenGroupA;