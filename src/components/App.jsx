import PropTypes from 'prop-types';

function RenderName({ name }) {
  return <div>{name}</div>;
}

RenderName.propTypes = {
  name: PropTypes.string,
};

RenderName.defaultProps = {
  name: 'Zach',
};

function App() {
  return (
    <>
      <p>Hello World!</p>
      <RenderName />
    </>
  );
}

export default App;
