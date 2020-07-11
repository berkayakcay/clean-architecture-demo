import React, { useState } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from 'app/models/activity'
import { v4 as uuid } from 'uuid'

interface IProps {
  setEditMode: (editMode: boolean) => void
  activity: IActivity | null
  createActivity: (activity: IActivity) => void
  editActivity: (activity: IActivity) => void
  submiting: boolean
}
const ActivityForm: React.FC<IProps> = ({ setEditMode, activity: initialFormState, createActivity, editActivity, submiting }) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      }
    }
  }

  const [activity, setActivity] = useState<IActivity>(initializeForm)

  const handleInputOnChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = () => {
    console.log(activity)
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity)
    } else {
      editActivity(activity)
    }
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input onChange={handleInputOnChange} name="title" placeholder="Title" value={activity.title} />
        <Form.TextArea onChange={handleInputOnChange} name="description" rows={2} placeholder="Description" value={activity.description} />
        <Form.Input onChange={handleInputOnChange} name="category" placeholder="Category" value={activity.category} />
        <Form.Input onChange={handleInputOnChange} name="date" type="date" placeholder="Date" value={activity.date} />
        <Form.Input onChange={handleInputOnChange} name="city" placeholder="City" value={activity.city} />
        <Form.Input onChange={handleInputOnChange} name="venue" placeholder="Venue" value={activity.venue} />
        <Button floated="right" positive type="submit" content="Submit" loading={submiting} />
        <Button floated="right" type="button" content="Cancel" onClick={() => setEditMode(false)} />
      </Form>
    </Segment>
  )
}

export default ActivityForm
