import PageExtrato from '@pages/Extrato'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/extrato')({
  component: () => <PageExtrato />
})
