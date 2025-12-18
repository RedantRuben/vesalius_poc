import ErrorPage from '@/components/ErrorPage';

// Using static text since not-found might be triggered outside of locale context
// (e.g., when an invalid locale is accessed like /invalid-locale/some-page)
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

