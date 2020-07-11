import React, { useState, useEffect, Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import axios from 'axios'
import { IActivity } from '../models/activity'
import { NavBar } from '../../features/nav/NavBar'
import { ActivityDashboard } from 'features/activities/dashboard/ActivityDashboard'

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)

  const [editMode, setEditMode] = useState(false)

  const handleOpenCreateForm = () => {
    setSelectedActivity(null)
    setEditMode(true)
  }
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.filter((x) => x.id === id)[0])
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleEditactivity = (activity: IActivity) => {
    setActivities([...activities.filter((x) => x.id !== activity.id), activity])
    setSelectedActivity(activity)
    setEditMode(false)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)])
  }

  useEffect(() => {
    axios.get<IActivity[]>('https://localhost:5001/api/activities').then((response) => {
      let activities: IActivity[] = []
      response.data.forEach((activity) => {
        activity.date = activity.date.split('.')[0]
        activities.push(activity)
      })
      setActivities(response.data)
    })
  }, [])

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
        />
      </Container>
    </Fragment>
  )
}

export default App
