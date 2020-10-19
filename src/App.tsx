import React, { useState } from 'react'
import './App.css'
import Nerd from './components/Nerd'
import { initialNerds } from './components/Nerd/defaultNerds'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Workspace from './components/Workspace'
import { INerd, IRating } from './types'
import { Button, Paper } from '@material-ui/core'
import { submitPeriod } from './utilities'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  selfStart: {
    alignSelf: 'flex-start',
  },
  list: {
    paddingLeft: 'inherit',
    '& li': {
      listStyleType: 'decimal',
    }
  }
}))

function App() {
  const classes = useStyles()

  const [nerds, setNerds] = useState(initialNerds)
  const [selectedNerd, setSelectedNerd] = useState<INerd>(nerds[0])
  const selectNerd = (id: string) => setSelectedNerd(nerds.find(n => n.id === id)!)

  const [ratings, setRatings] = useState<IRating[]>([])
  const addRating = (r: IRating) => setRatings([...ratings, r])

  const submit = () => {
    setNerds(submitPeriod(nerds, ratings))
    setRatings([])
  }

  return (
    <Container maxWidth="md">
      <header className="header">
        <Typography variant="h1">NerdMastery</Typography>
      </header>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={3} container spacing={1} direction="column">
            {nerds.map(nerd => <Grid key={nerd.id} item xs><Nerd {...nerd} select={() => selectNerd(nerd.id)} /></Grid>)}
          </Grid>
          <Grid item xs container spacing={3} direction="column" className={classes.selfStart}>
            <Workspace addRating={addRating} nerds={nerds} nerd={selectedNerd} />
            {!!ratings.length && (
              <Grid item xs>
                <Paper className={classes.paper}>
                  <Typography variant="h5">
                    <Button variant="contained" color="primary" onClick={submit}>Submit all ratings in period</Button>
                  </Typography>
                  <ul className={classes.list}>
                    {ratings.map((r, i) => <li key={i}>{r.evaluatorName} rated {r.nerdName} with a {r.rating}</li>)}
                  </ul>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default App
