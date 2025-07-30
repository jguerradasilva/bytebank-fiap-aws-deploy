import { createRootRoute } from '@tanstack/react-router'
import { Layout } from '@pages/Layout'
import PageNotFound from '@pages/NotFound'


export const Route = createRootRoute({
  component: () => <Layout />,
  notFoundComponent: () => <PageNotFound />
})


