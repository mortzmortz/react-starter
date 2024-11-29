function App() {
  return (
    <>
      <h1 className="text-[5vw]">
        {Array.from({ length: 1000 })
          .map(() => '🪼')
          .join(' ')}
      </h1>
    </>
  );
}

export default App;
