import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(container)/games')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(container)/games"!</div>
}
