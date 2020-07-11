import React, { useState, useEffect, Fragment, SyntheticEvent } from 'react'
import { Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity'
import { NavBar } from '../../features/nav/NavBar'
import { ActivityDashboard } from 'features/activities/dashboard/ActivityDashboard'
import agent from 'app/api/agent'
import { LoadingComponent } from './LoadingComponent'

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submiting, setSubmiting] = useState(false)

  const [target, setTarget] = useState('')

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((x) => x.id === id)[0])
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmiting(true)
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
      })
      .then(() => setSubmiting(false))
  }

  const handleEditactivity = (activity: IActivity) => {
    setSubmiting(true)
    agent.Activities.update(activity)
      .then(() => {
        setActivities([...activities.filter((x) => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
      })
      .then(() => setSubmiting(false))
  }

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setSubmiting(true)
    setTarget(event.currentTarget.name)
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter((x) => x.id !== id)])
      })
      .then(() => setSubmiting(false))
  }

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: IActivity[] = []
        response.forEach((activity) => {
          activity.date = activity.date.split('.')[0]
          activities.push(activity)
        })
        setActivities(activities)
      })
      .then(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent content="Loading.." />

  return (
    <Fragment>
      <NavBar openCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          createActivity={handleCreateActivity}
          editActivity={handleEditactivity}
          deleteActivity={handleDeleteActivity}
          submiting={submiting}
          target={target}
        />
      </Container>
    </Fragment>
  )
}

export default App
