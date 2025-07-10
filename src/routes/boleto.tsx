import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/boleto')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/boleto"!</div>
}
