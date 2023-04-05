import { useRouteError } from "react-router-dom";
import './ErrorPage.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1 className="oppsh1">Oops!</h1>
      <h1 className="oppsh1-2">404</h1>
      <p className="oppsh1-2">Sorry, an unexpected error has occurred.</p>
      <p className="p-error">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}