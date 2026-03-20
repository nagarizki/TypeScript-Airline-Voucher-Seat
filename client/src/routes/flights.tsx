import { createFileRoute } from '@tanstack/react-router'

import AvailableFlightPage from '../pages/available-flight'

export const Route = createFileRoute('/flights')({
  component: AvailableFlightPage,
})