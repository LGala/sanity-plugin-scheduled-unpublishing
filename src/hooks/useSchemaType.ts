import {Schedule} from '../types'
import {useMemo} from 'react'
import schema from 'part:@sanity/base/schema'
import {SchemaType} from '@sanity/types'
import {getScheduledDocument} from '../utils/paneItemHelpers'

export function useScheduleSchemaType(schedule: Schedule): SchemaType | undefined {
  const firstDocument = getScheduledDocument(schedule)
  return useSchemaType(firstDocument.documentType)
}

export function useSchemaType(schemaName?: string): SchemaType | undefined {
  return useMemo(() => schema.get(schemaName), [schemaName])
}
