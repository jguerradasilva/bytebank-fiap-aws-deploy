import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transferir')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/transferir"!</div>
}
