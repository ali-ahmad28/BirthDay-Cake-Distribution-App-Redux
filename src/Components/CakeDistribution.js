import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Button, TextField, useTheme } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { updateName, updateBirthDate, updateTable, updateCakeSize, updateSmallCakeCount, updateLargeCakeCount } from './Redux/Action';
import { styled } from '@mui/system';
import PieChartComponent from './PieChartComponent';
export const CakeDistribution = () => {
    const dispatch = useDispatch()
    const theme = useTheme();

    const MyBox = styled(Box)({
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    });


    const MyTextField = styled(TextField)({
        marginRight: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(4),
        },
    })

    const MyDatePicker = styled(DatePicker)({
        marginRight: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(4),
        },
    })
    const myState = useSelector(state => state.InputDataReducer)

    const convertBirthYearToCurrentYear = (birthDate) => {
        const currentYear = new Date().getFullYear();
        const userBirthDate = new Date(birthDate);
        userBirthDate.setFullYear(currentYear);
        return userBirthDate;
    }

    const getWeekDayOfComingBirthDay = (birthDate) => {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames[convertBirthYearToCurrentYear(birthDate).getDay() + 1]
    }

    const IsWeekEnd = (WeekDayOfComingBirthDay) => {
        if (WeekDayOfComingBirthDay !== 'Sunday' && WeekDayOfComingBirthDay !== 'Saturday') {
            return false
        }
        else {
            return true
        }
    }

    const getCakeDay = (birthDate) => {
        const cakeDay = convertBirthYearToCurrentYear(new Date(birthDate));
        if (IsWeekEnd(getWeekDayOfComingBirthDay(birthDate))) {
            if (getWeekDayOfComingBirthDay(birthDate) === "Friday") {
                cakeDay.setDate(cakeDay.getDate() + 1);
                return cakeDay.toISOString().split('T')[0]
            }
            else {
                cakeDay.setDate(cakeDay.getDate() + 2);
                return cakeDay.toISOString().split('T')[0]
            }
        }
        else {
            cakeDay.setDate(cakeDay.getDate() + 1);
            if (IsWeekEnd(getWeekDayOfComingBirthDay(cakeDay))) {
                if (getWeekDayOfComingBirthDay(cakeDay) === "Saturday") {
                    cakeDay.setDate(cakeDay.getDate() + 2);
                }
                else {
                    cakeDay.setDate(cakeDay.getDate() + 1);
                }
                return cakeDay.toISOString().split('T')[0]
            }
            else {
                return cakeDay.toISOString().split('T')[0]
            }
        }
    }

    const getCakeSize = (birthDate) => {
        const foundObject = myState.tableData.slice(0, -1).find(obj => new Date(obj.birth).getTime() === new Date(birthDate).getTime());
        if (foundObject) {
            dispatch(updateCakeSize("large"))
        }
        else {
            dispatch(updateCakeSize("small"))
        }
        console.log("array1 ", myState.cakeSize);
        updateCount(myState.cakeSize)
        console.log("array2 ", myState.cakeSize);

    }

    const updateCount = (arr) => {
        dispatch(updateSmallCakeCount(arr.reduce((count, item) => item === "small" ? count + 1 : count, 0)))
        // console.log("small from fun", arr.reduce((count, item) => item === "small" ? count + 1 : count, 0))
        dispatch(updateLargeCakeCount(arr.reduce((count, item) => item === "large" ? count + 1 : count, 0)))
        // console.log("large from fun", arr.reduce((count, item) => item === "large" ? count + 1 : count, 0))
    }

    return (
        <>
            <Box sx={{
                marginTop: theme.spacing(4),
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                },
            }}>
                <TextField
                    sx={{
                        marginRight: theme.spacing(4),
                        [theme.breakpoints.down('md')]: {
                            marginTop: theme.spacing(4),
                        },
                    }}
                    required
                    id='Name'
                    label='Name'
                    variant='filled'
                    onChange={(e) => dispatch(updateName(e.target.value))}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{
                            marginRight: theme.spacing(4),
                            [theme.breakpoints.down('md')]: {
                                marginTop: theme.spacing(4),
                            },
                        }}
                        label="Birth Date"
                        onChange={(date) => dispatch(updateBirthDate(date.toISOString().split('T')[0]))}
                    />
                </LocalizationProvider>
                <Button variant='contained'
                    sx={{
                        marginRight: theme.spacing(4),
                        [theme.breakpoints.down('md')]: {
                            marginTop: theme.spacing(4),
                        },
                    }}
                    onClick={() => {
                        //updateCount(myState.cakeSize)
                        dispatch(updateTable({ name: myState.name, birth: myState.birthDate }))
                        getCakeSize(myState.birthDate)
                    }
                    }
                >
                    ADD
                </Button>
            </Box>
            <Box
                sx={{
                    m: theme.spacing(4),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Date of Birth</TableCell>
                            <TableCell>Date of Cake</TableCell>
                            <TableCell>Size of Cake</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myState.tableData.map((record, index) => (
                            <TableRow key={index}>
                                <TableCell>{record.name}</TableCell>
                                <TableCell>{record.birth}</TableCell>
                                <TableCell>{getCakeDay(record.birth)}</TableCell>
                                <TableCell>{myState.cakeSize[index]}</TableCell>
                                {/* <TableCell>{console.log("small", myState.smallCakes, "large", myState.largeCakes)}</TableCell> */}
                                {/* <TableCell>{myState.cakeSize}</TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box sx={{
                marginTop: theme.spacing(4),
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                // [theme.breakpoints.down('md')]: {
                //     flexDirection: 'column',
                // },
            }}>
                <PieChartComponent />
            </Box>
        </>
    )
}
