import CollectionEventForm from '@/components/CollectionEventForm'
import GeminiAnalyzer from '@/components/GeminiAnalyzer'
import React from 'react'

const CollectorDashboard = () => {
  return (
    <div>
        <h1>Collector Dashboard</h1>
        <CollectionEventForm />
        <GeminiAnalyzer />
    </div>
  )
}

export default CollectorDashboard