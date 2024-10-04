export default function Home() {
  return (
    <>
      <h1>Počasí</h1>
      <div className="city-selector">
        <form action="">
          <input type="text" name="" id="" />
          <button>Načíst počasí</button>
        </form>
      </div>
      <div className="weather-display">
        <h2>Předpověď pro město</h2>
        <p>Teplota: </p>
        <p>Počasí: </p>
      </div>
    </>
  );
}
