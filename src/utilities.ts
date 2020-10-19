import glicko2 from 'glicko2'
import { IGlicko, INerd, IRating } from './types'

type IMatch = [
  IGlicko,
  IGlicko,
  number
]



export const submitPeriod = (nerds: INerd[], ratings: IRating[]): INerd[] => {
  const settings = {
    tau: 0.5,
    rpd: 604800,
    rating: 1500,
    rd: 300,
    vol: 0.06
  }
  const glicko = new glicko2.Glicko2(settings)

  const weightedMatches = (evaluator: INerd, target: INerd, rating: IRating): IMatch[] => {
    const fakeOpponent: IGlicko = glicko.makePlayer(target.rating + target.rd * rating.rating, target.rating, target.volatility)
    const weightedEvaluators = nerds.sort((a, b) => a.rating > b.rating ? 1 : -1)
    const topEvaluator = weightedEvaluators[weightedEvaluators.length - 1]
    const bottomEvaluator = weightedEvaluators[0]
    let matches = []
    if (topEvaluator.rating === bottomEvaluator.rating) {
      matches = Array(Math.ceil(Math.log2(evaluator.level)) + 1).fill([target.glicko, fakeOpponent, rating.rating > 0 ? 1 : 0])
    } else {
      const outcome = (rating.rating > 0 ? 0.5 : -0.5) + 0.5 * ((evaluator.rating - bottomEvaluator.rating) / (topEvaluator.rating - bottomEvaluator.rating))
      matches = Array(Math.ceil(Math.log2(evaluator.level)) + 1).fill([target.glicko, fakeOpponent, outcome])
    }
    return matches
  }

  nerds.forEach(nerd => nerd.glicko = glicko.makePlayer(nerd.rating, nerd.rd, nerd.volatility))

  const matches: IMatch[] = nerds.reduce((a: IMatch[], target) => {
    return [...a, ...nerds.filter(n => n.id !== target.id).reduce((a2: IMatch[], evaluator) => {
      const currentRatings = ratings.filter(e => e.evaluatorId === evaluator.id && e.nerdId === target.id)
      if (currentRatings.length) {
        return [...a2, ...currentRatings.reduce((a3: IMatch[], rating) => [...a3, ...weightedMatches(evaluator, target, rating)], [])]
      } else {
        return [...a2, ...Array(Math.ceil(Math.log2(evaluator.level))).fill([target.glicko, target.glicko, 0.5])]
      }
    }, [])]
  }, [])

  glicko.updateRatings(matches)
  nerds.forEach(nerd => {
    nerd.ratingShift = nerd.glicko!.getRating() - nerd.rating
    nerd.rating = nerd.glicko!.getRating()
    nerd.rd = nerd.glicko!.getRd()
    nerd.volatility = nerd.glicko!.getVol()
  })
  return nerds
}