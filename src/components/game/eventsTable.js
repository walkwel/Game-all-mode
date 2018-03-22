import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import * as moment from 'moment';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class EventsTable extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes, events } = this.props;
    return (
      <div>
        {events.length > 0 && (
          <div>
            <Divider />
            <Typography variant="display1">Events Table</Typography>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell numeric>Sr No.</TableCell>
                    <TableCell>Event Type</TableCell>
                    <TableCell>Game Mode</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell numeric>{index + 1}</TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>{event.gameMode.name}</TableCell>
                        <TableCell>{moment(event.timeStamp).format('LTS')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

EventsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsTable);
