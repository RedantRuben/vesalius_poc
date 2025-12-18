import ErrorPage from '@/components/ErrorPage';

// Root-level not-found page for routes that don't match any locale
// This is needed because [locale]/not-found.tsx only works within the locale context
export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      subtitle="This page went to get a second opinion and never came back."
      actionLabel="Back to Homepage"
      actionHref="/"
    />
  );
}

