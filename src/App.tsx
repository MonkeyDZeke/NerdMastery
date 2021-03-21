import React, { useState } from 'react'
import { Button, Callout, Card, ControlGroup, Elevation, HTMLSelect, Slider, Tag } from '@blueprintjs/core'
import './App.css'
import { people, traits } from './data'
import { IEvaluation } from './types'
import { calculateSession } from './utilities'

// reducer to update people details

interface IOption {
  label: string
  value: string
}

function App() {
  const [players, setPlayers] = useState(people)
  const playerOptions = players.map(player => ({ label: player.name, value: player.id }))

  const [evaluator, setEvaluator] = useState<IOption>({ label: 'Select Evaluator', value: '' })
  const [nerd, setNerd] = useState<IOption>({ label: 'Select Nerd', value: '' })
  const evaluators = playerOptions.filter(p => p.value !== nerd.value)
  const nerds = playerOptions.filter(p => p.value !== evaluator.value)

  const [trait, setTrait] = useState('')

  const [rating, setRating] = useState(0)

  const [evaluations, setEvaluations] = useState<IEvaluation[]>([])
  const addEvaluation = () => setEvaluations(
    [
      ...evaluations,
      {
        evaluatorId: evaluator.value,
        nerdId: nerd.value,
        boost: 1,
        trait,
        rating
      }
    ]
  )

  const submit = () => {
    const results = calculateSession({
      players,
      settings: {},
      evaluations,
      traits
    })
    setPlayers(results)
    setEvaluations([])
    console.log(results)
  }

  return (
    <div>
      <Callout title="Welcome to the NerdMastery playtest">Create a set of evaluations for this session. When you are ready, click "Calculate Results" and see what happens!</Callout>
      <div className="section evaluate-form">
        <ControlGroup fill>
          <HTMLSelect
            onChange={({ currentTarget: { value } }) => setEvaluator(value ? evaluators.find(e => e.value === value)! : { label: 'Select Evaluator', value: '' })}
            value={evaluator.value}
            options={[{ label: 'Select Evaluator', value: '' }, ...evaluators]}
          />
          <HTMLSelect
            onChange={({ currentTarget: { value } }) => setNerd(value ? nerds.find(e => e.value === value)! : { label: 'Select Nerd', value: '' })}
            value={nerd.value}
            options={[{ label: 'Select Nerd', value: '' }, ...nerds]}
          />
          <HTMLSelect
            onChange={({ currentTarget: { value } }) => setTrait(value)}
            value={trait}
            options={[{ label: 'Select Trait', value: '' }, ...traits]}
          />
          <Slider max={1} min={-1} stepSize={0.2} value={rating} onChange={(n: number) => setRating(n)} labelStepSize={0.2} />
        </ControlGroup>
        <Button onClick={addEvaluation} disabled={!evaluator.value || !nerd.value || !trait} fill>Add Evaluation</Button>
      </div>
      <div className="section evaluations">
        {evaluations.map((e, i) =>
          <Tag key={e.evaluatorId + i} onRemove={() => setEvaluations([...evaluations.slice(0,i), ...evaluations.slice(i+1)])}>
            {`${players.find(p => p.id === e.evaluatorId)!.name} rates ${players.find(p => p.id === e.nerdId)!.name}'s ${e.trait} at ${e.rating}`}
          </Tag>
        )}
      </div>
      <div className="section">
        <Button large fill onClick={submit} disabled={!evaluations.length}>Calculate Results!</Button>
      </div>
      <div className="section players">
        {players.map(player =>
          <Card elevation={Elevation.ONE} className={'player'} key={player.id}>
            <h2>{player.name} <i>lvl: {player.level}</i></h2>
            {traits.map(t =>
              <Card key={t}>
                <h3>{t}</h3>
                <p><strong>Rating: </strong>{player.traits[t].rating}</p>
                <p><strong>Rating Shift: </strong>{player.traits[t].ratingShift}</p>
                <p><strong>Rating Deviation: </strong>{player.traits[t].rd}</p>
                <p><strong>Volatility: </strong>{player.traits[t].volatility}</p>
              </Card>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}

export default App
