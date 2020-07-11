import React from 'react'
import { Card, Image,  Button } from 'semantic-ui-react'
import { IActivity } from 'app/models/activity'

interface IProps {
  activity: IActivity
  editMode: boolean
  setEditMode: (editMode: boolean) => void
  setSelectedActivity: (selectedActivity: IActivity | null) => void
}
const ActivityDetails: React.FC<IProps> = ({ activity, editMode, setEditMode, setSelectedActivity }) => {
  return (
    <Card fluid>
      <Image src="/assets/placeholder.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" onClick={() => setEditMode(true)} content="Edit" />
          <Button basic color="grey" onClick={() => setSelectedActivity(null)} content="Cancel" />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails
