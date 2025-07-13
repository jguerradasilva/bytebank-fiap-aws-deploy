import PageTransferir from '@pages/Transferir'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transferir')({
  component: () => <PageTransferir />,
})