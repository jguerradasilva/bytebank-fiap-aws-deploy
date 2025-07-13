
import PageDashboard from '@pages/Dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: () => <PageDashboard />

})


