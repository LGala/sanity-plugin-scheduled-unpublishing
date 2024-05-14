import type {ValidationMarker} from '@sanity/types'
import {Stack} from '@sanity/ui'
import React, {PropsWithChildren} from 'react'
import {ScheduleFormData} from '../../types'
import ScheduleForm from './ScheduleForm'

interface Props {
  customValidation: (selectedDate: Date) => boolean
  markers?: ValidationMarker[]
  onChange?: (formData: ScheduleFormData) => void
  value?: ScheduleFormData | null
}

export function EditScheduleForm(props: PropsWithChildren<Props> & {title?: string}) {
  const {customValidation, markers, onChange, value, title} = props

  return (
    <Stack space={4}>
      {props.children}
      <ScheduleForm
        customValidation={customValidation}
        markers={markers}
        onChange={onChange}
        value={value}
        title={title}
      />
    </Stack>
  )
}
