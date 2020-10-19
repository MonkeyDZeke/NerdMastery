import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { INerd, IRating } from '../../types'
import { Typography, Paper, FormControl, InputLabel, MenuItem, Select, Radio, RadioProps, Button, Grid } from '@material-ui/core'
import { green, yellow, red, orange, grey } from '@material-ui/core/colors'

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const GoldRadio = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const GrayRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

interface IProps {
  nerd: INerd
  nerds: INerd[]
  addRating: (arg0: IRating) => void
}

const Workspace: React.FC<IProps> = ({ nerd, nerds, addRating }: IProps) => {
  const classes = useStyles()
  const [evaluators, setEvaluators] = useState<INerd[]>([])
  const [evaluatorId, setEvaluatorId] = useState('')
  const evaluator = evaluators.find(n => n.id === evaluatorId)
  const [rating, setRating] = useState(6)

  useEffect(() => {
    setEvaluators(nerds.filter(n => n.id !== nerd.id))
    if (evaluatorId === nerd.id) setEvaluatorId('')
  }, [nerd, nerds, evaluatorId])

  const handleEvaluatorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEvaluatorId(event.target.value as string)
  }
  const handleRatingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRating(Number(event.target.value))
  }

  const submit = () => addRating({
    nerdId: nerd!.id,
    nerdName: nerd!.name,
    evaluatorId: evaluatorId,
    evaluatorName: evaluator!.name,
    rating
  })

  return (
    <Grid item xs>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center" paragraph>{nerd ? nerd.name : 'Select a Nerd'}</Typography>
        {nerd && (
          <>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="evaluator-label">Evaluator</InputLabel>
              <Select
                labelId="evaluator-label"
                id="evaluator"
                value={evaluatorId}
                onChange={handleEvaluatorChange}
                key={nerd.id}
                autoWidth
              >
                <MenuItem value="" disabled>none</MenuItem>
                {evaluators.map(n => <MenuItem value={n.id} key={n.id}>{n.name}</MenuItem>)}
              </Select>
            </FormControl>
            <br />
            <div>
              <RedRadio
                checked={rating === -1}
                onChange={handleRatingChange}
                value={-1}
                name="rating"
                inputProps={{ 'aria-label': '1' }}
              />
              <OrangeRadio
                checked={rating === -0.8}
                onChange={handleRatingChange}
                value={-0.8}
                name="rating"
                inputProps={{ 'aria-label': '2' }}
              />
              <OrangeRadio
                checked={rating === -0.6}
                onChange={handleRatingChange}
                value={-0.6}
                name="rating"
                inputProps={{ 'aria-label': '3' }}
              />
              <OrangeRadio
                checked={rating === -0.4}
                onChange={handleRatingChange}
                value={-0.4}
                name="rating"
                inputProps={{ 'aria-label': '4' }}
              />
              <GrayRadio
                checked={rating === -0.2}
                onChange={handleRatingChange}
                value={-0.2}
                name="rating"
                inputProps={{ 'aria-label': '5' }}
              />
              <GrayRadio
                checked={rating === 0.2}
                onChange={handleRatingChange}
                value={0.2}
                name="rating"
                inputProps={{ 'aria-label': '6' }}
              />
              <GreenRadio
                checked={rating === 0.4}
                onChange={handleRatingChange}
                value={0.4}
                name="rating"
                inputProps={{ 'aria-label': '7' }}
              />
              <GreenRadio
                checked={rating === 0.6}
                onChange={handleRatingChange}
                value={0.6}
                name="rating"
                inputProps={{ 'aria-label': '8' }}
              />
              <GreenRadio
                checked={rating === 0.8}
                onChange={handleRatingChange}
                value={0.8}
                name="rating"
                inputProps={{ 'aria-label': '9' }}
              />
              <GoldRadio
                checked={rating === 1}
                onChange={handleRatingChange}
                value={1}
                name="rating"
                inputProps={{ 'aria-label': '10' }}
              />
            </div>
            <Button color="primary" onClick={submit} disabled={!evaluatorId}>Submit Rating</Button>
          </>
        )}
      </Paper>
    </Grid>
  )
}

export default Workspace
