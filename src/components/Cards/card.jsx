import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CountUp from 'react-countup'
const useStyles = makeStyles({
    root: {
        minWidth: 225,
    },
    text: {
        marginBottom: 12,
    },
});

const Cardd = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation={3} style={{ borderBottom: `0.5em solid ${props.color}` }}>
            <CardContent>
                <Typography variant="h5"  align="center" style={{ color: `${props.color}`, fontWeight: "bold"  }} className={classes.text}  gutterBottom>{props.title} </Typography>
                <Typography variant="h5"  align="center" style={{ color: `${props.color}`, fontWeight: "bolder" }} gutterBottom> <CountUp
                   start={0}
                   end={props.text}
                   duration={2.5}
                separator=","
                /> </Typography>
            </CardContent>
        </Card>
    );
}

export default Cardd;
