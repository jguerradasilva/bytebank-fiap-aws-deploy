import PageDeposito from '@pages/Deposito'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deposito')({
  component: () => <PageDeposito />,
})