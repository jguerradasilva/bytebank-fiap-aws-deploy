import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deposito')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/deposito"!</div>
}
