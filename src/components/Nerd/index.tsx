import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
})

interface IProps extends INerd {
    select: () => void
}

const Nerd: React.FC<IProps> = ({ name, rating, rd, volatility, select }: IProps) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.stat} color="textSecondary">
          Rating: {rating}
        </Typography>
        <Typography className={classes.stat} color="textSecondary">
          Rating Deviation: {rd}
        </Typography>
        <Typography className={classes.stat} color="textSecondary">
          Volatility: {volatility}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={select} size="small" fullWidth>Select</Button>
      </CardActions>
    </Card>
  )
}

export default Nerd