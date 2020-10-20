import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { INerd } from '../../types'


const useStyles = makeStyles({
  root: {
  },
  title: {
    fontSize: 14,
  },
  stat: {
    fontSize: 12,
  },
  posShift: {
    color: green[400],
  },
  negShift: {
    color: red[400],
  },
})

interface IProps extends INerd {
  select: () => void
}

const Nerd: React.FC<IProps> = ({ name, level, rating, ratingShift, rd, volatility, select }: IProps) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="primary" gutterBottom>
          {name}: {level}
        </Typography>
        <Typography className={classes.stat} color="secondary">
          Rating: {ratingShift !== 0 && <span className={ratingShift > 0 ? classes.posShift : classes.negShift}>{ratingShift}</span>}
        </Typography>
        <Typography className={classes.stat} color="textSecondary">
          {rating}
        </Typography>
        <Typography className={classes.stat} color="secondary">
          Rating Deviation:
        </Typography>
        <Typography className={classes.stat} color="textSecondary">
          {rd}
        </Typography>
        <Typography className={classes.stat} color="secondary">
          Volatility:
        </Typography>
        <Typography className={classes.stat} color="textSecondary">
          {volatility}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={select} size="small" fullWidth>Select</Button>
      </CardActions>
    </Card>
  )
}

export default Nerd