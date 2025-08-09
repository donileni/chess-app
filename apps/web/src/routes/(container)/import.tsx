import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(container)/import')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(container)/import"!</div>
}
