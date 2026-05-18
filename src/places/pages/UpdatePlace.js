import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/Validators'
import './PlaceForm.css'
import { useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://images.unsplash.com/photo-1778406678784-345414e7894e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://media.istockphoto.com/id/521714583/photo/new-york-city-midtown-with-empire-state-building-at-sunset.jpg?s=2048x2048&w=is&k=20&c=pU4vIC2oKnzd64JbNZ8uxWfXKhcLvg5cow7ddX3NCr0=',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u2',
  },
]

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true)
  const placeId = useParams().placeId

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false,
  )

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId)

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true,
      )
    }

    setIsLoading(false)
  }, [setFormData, identifiedPlace])

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
  }

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading..</h2>
      </div>
    )
  }

  return (
    <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title.'
        onInput={inputHandler}
        initialvalue={formState.inputs.title.value}
        initialvalid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min. 5 characters).'
        onInput={inputHandler}
        initialvalue={formState.inputs.description.value}
        initialvalid={formState.inputs.description.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  )
}

export default UpdatePlace
