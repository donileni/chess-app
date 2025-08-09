import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(container)/analyze')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(container)/analyze"!</div>
}
