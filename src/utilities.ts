import glicko2 from 'glicko2'
import { IGlicko, INerd, ISession, ITrait } from './types'

type IMatch = [
  IGlicko,
  IGlicko,
  number
]

const constrainBoost = (n: number) => Math.min(Math.max(n, 0.9), 1.1)

export const calculateSession = ({ players, settings, evaluations, traits }: ISession): INerd[] => {
  // set up glicko2
  const defaultSettings = {
    tau: 0.5,
    rpd: 604800,
    rating: 1500,
    rd: 300,
    vol: 0.06
  }
  const glicko = new glicko2.Glicko2({...settings, ...defaultSettings})
  players.forEach(({ traits }) =>
    Object.keys(traits).forEach(trait =>
      traits[trait].glicko = glicko.makePlayer(traits[trait].rating, traits[trait].rd, traits[trait].volatility)
    )
  )

  // rank evaluators per trait
  const rankedEvaluators: { [key: string]: ITrait[] } = traits.reduce((a, trait) =>
    ({
      ...a,
      [trait]: players
        .map(({ traits }) => traits[trait])
        .sort((a, b) => a.rating > b.rating ? 1 : -1)
    }),
    {}
  )

  // create matches
  let matches: IMatch[] = []
  evaluations.forEach(({ evaluatorId, nerdId, trait, boost, rating }) => {
    const evaluator = players.find(player => player.id === evaluatorId)
    const nerd = players.find(player => player.id === nerdId)
    if (!evaluator || !nerd) return
    
    const eTrait = evaluator.traits[trait]
    const nTrait = nerd.traits[trait]

    const dummy: IGlicko = glicko.makePlayer(nTrait.rating + nTrait.rd * rating, nTrait.rd, nTrait.volatility)

    const topEvaluator = rankedEvaluators[trait][rankedEvaluators[trait].length - 1]
    const bottomEvaluator = rankedEvaluators[trait][0]

    const weight = Math.ceil(
      (Math.log2(evaluator.level) + 1)
        * 10000
        * constrainBoost(evaluator.boost)
        * constrainBoost(eTrait.boost)
        * constrainBoost(nerd.boost)
        * constrainBoost(nTrait.boost)
        * constrainBoost(boost)
    )

    if (topEvaluator.rating === bottomEvaluator.rating) {
      matches = [...matches, ...Array(weight).fill([nTrait.glicko, dummy, rating > 0 ? 1 : 0])]
    } else {
      const outcome = (rating > 0 ? 0.5 : -0.5) + 0.5 * ((eTrait.rating - bottomEvaluator.rating) / (topEvaluator.rating - bottomEvaluator.rating))
      matches = [...matches, ...Array(weight).fill([nTrait.glicko, dummy, outcome])]
    }
  })

  // run the calculations and update the players
  glicko.updateRatings(matches)
  players.forEach(({ traits }) => Object.values(traits).forEach(trait => {
    trait.ratingShift = trait.glicko!.getRating() - trait.rating
    trait.rating = trait.glicko!.getRating()
    trait.rd = trait.glicko!.getRd()
    trait.volatility = trait.glicko!.getVol()
  }))

  return players
}