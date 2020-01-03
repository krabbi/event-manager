import React from "react";
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";
import {
    IconButton,
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({
    titleLink: {
        color: 'inherit',
        textDecoration: 'none',
        "&:hover": {
            fontWeight: 600,
        },
    },
    linkButton: {
        padding: 0,
    },
});

function EventRow(props) {
    const { row } = props;
    const classes = useStyles();
    const startDate = new Date(row.start_time);
    return (
      <TableRow key={row.id} >
        <TableCell>
            <Typography component={Link} to={`/events/${row.id}`} className={classes.titleLink}>
                {row.name}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography>
                {startDate.toLocaleDateString(undefined, {
                    year: 'numeric', 
                    month: 'numeric', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography>
                {row.ticket_price_currency} {Number(row.min_ticket_price)} - {Number(row.max_ticket_price)}
            </Typography>
        </TableCell>
        <TableCell>
            <IconButton 
                component='a' 
                href={row.uri} 
                target='_blank'
                className={classes.linkButton}
            >
                <LinkIcon />
            </IconButton>
        </TableCell>
      </TableRow>
    );
};

export default EventRow;
