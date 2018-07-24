import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const MainPage = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Grid container justify='flex-end' spacing={12}>
            <Grid item xs={2}>
              <SettingsApplicationsIcon style={{ fontSize: 40 }} />
            </Grid>
            <Grid item xs={1}>
              <AccountCircleIcon style={{ fontSize: 40 }} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Button variant='contained'>Magic Carpet</Button>
    </div>
  );
}

export default MainPage;
