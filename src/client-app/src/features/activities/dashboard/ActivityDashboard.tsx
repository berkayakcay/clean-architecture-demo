import React, { SyntheticEvent } from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from 'app/models/activity'
import { ActivityList } from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

interface IProps {
  activities: IActivity[]
  selectActivity: (id: string) => void
  selectedActivity: IActivity | null
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  setSelectedActivity: (selectedActivity: IActivity | null) => void
  createActivity: (activity: IActivity) => void
  editActivity: (activity: IActivity) => void
  deleteActivity: (e: SyntheticEvent<HTMLButtonElement>, id: string) => void
  submiting: boolean
  target: string
}
export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  createActivity,
  editActivity,
  deleteActivity,
  submiting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submiting={submiting} target={target} />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails activity={selectedActivity} editMode={editMode} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity?.id || 0}
            setEditMode={setEditMode}
            activity={selectedActivity}
            createActivity={createActivity}
            editActivity={editActivity}
            submiting={submiting}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}
