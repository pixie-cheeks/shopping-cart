import { Navbar } from '../Navbar/Navbar.jsx';

function ErrorPage() {
  return (
    <>
      <Navbar />
      <h1>Error!</h1>
      <p>Seems like the given URL doesn&apos;t exist.</p>
    </>
  );
}

export { ErrorPage };
