import { Navbar } from '../Navbar/Navbar.jsx';

function ErrorPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="page__container">
        <h1>Error!</h1>
        <p>Seems like the given URL doesn&apos;t exist.</p>
      </main>
    </>
  );
}

export { ErrorPage };
