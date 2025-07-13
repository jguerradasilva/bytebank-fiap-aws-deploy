import PageBoleto from '@pages/Boleto'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boleto')({
  component: () => <PageBoleto />
})