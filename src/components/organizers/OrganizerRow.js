import React from "react";
import { makeStyles } from '@material-ui/styles';
import {
    IconButton,
    TableRow,
    TableCell,
    Typography,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({
    cell: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    linkButton: {
        padding: 0,
    },
});

function OrganizerRow(props) {
    const { row } = props;
    const classes = useStyles();
    return (
      <TableRow key={row.id} >
        <TableCell className={classes.cell}>
            <Typography>
                {row.name}
            </Typography>
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

export default OrganizerRow;
