# Aplikace Počasí

## Popis aplikace

Tato webová aplikace **Počasí** načítá předpověď počasí z API **OpenWeather** a zobrazuje ji pro vybrané město v intervalech po 3 hodinách na následujících 5 dní. Aplikace byla vytvořena pomocí **Next.js** v prostředí JavaScriptu, s důrazem na **funkcionální programování**. Pro potřeby našeptávače měst využívá JSON data měst poskytovaná OpenWeather a pro vizualizaci počasí ikony z knihovny **Bootstrap**.

## Technologie

- **Next.js** (React framework)
- **JavaScript** (funkcionální programování)
- **OpenWeather API** (pro získávání dat o počasí)
- **Bootstrap Icons** (pro zobrazení ikon počasí)
- **JSON měst** (pro našeptávač názvů měst)

## Spuštění a nasazení aplikace


### 1. Klonování repozitáře

Nejprve naklonuj repozitář aplikace na lokální úložiště:

```bash
git clone https://github.com/daxovi/pocasi.git
cd weather-app
```


### 2. Instalace závislostí
Nainstaluj všechny potřebné závislosti:

```bash
npm install
```


### 3. Konfigurace API klíče
Vytvoř soubor .env.local v kořenovém adresáři projektu a vlož svůj API klíč pro OpenWeather:

```bash
NEXT_PUBLIC_OPENWEATHERAPIKEY=tvuj-api-klic
```

Tento klíč získáš po registraci na stránce <https://openweathermap.org/>.


### 4. Spuštění aplikace pro lokální vývoj
Aplikaci můžeš spustit lokálně pomocí následujícího příkazu:

```bash
npm run dev
```

Aplikace bude dostupná na adrese <http://localhost:3000>.


### 5. Build aplikace pro produkční nasazení
Pro vytvoření produkční verze aplikace použij následující příkazy:

```bash
npm run build
npm run export
```

Export aplikace vytvoří složku `out`, která obsahuje statické soubory připravené pro nasazení.


### 6. Nasazení na server (statický hosting)
Pokud chceš aplikaci nasadit na vlastní statický hosting pomocí FTP, nahraj obsah složky `out` na svůj server.

## Struktura aplikace


### Komponenty
- **CitySelector** – Formulář, který umožňuje uživateli zadat název města. Má implementovaný našeptávač, který při zadání minimálně 3 písmen nabízí názvy měst z JSON souboru.
- **Forecast** – Komponenta, která zobrazuje předpověď počasí na 5 dní. Počasí je rozděleno do časových úseků po 3 hodinách.
- **ForecastItem** – Jednotlivý prvek předpovědi, který zobrazuje počasí, teplotu a čas pro konkrétní 3hodinový úsek.


### API komunikace
Aplikace načítá data o počasí z **OpenWeather API** na základě zvoleného města. API klíč je předáván pomocí `.env.local` souboru a je přístupný ve front-endové části díky **NEXT_PUBLIC_OPENWEATHERAPIKEY**. Pro získání dat používá aplikace následující funkci definovanou v souboru **/src/utils/fetchWeather.js**:

```javascript
// /src/utils/fetchWeather.js

export const fetchWeatherData = async (city) => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERAPIKEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Město nebylo nalezeno");
  }

  const data = await response.json();
  return data;
};
```
Tato funkce provádí asynchronní požadavek na OpenWeather API a vrací data o předpovědi počasí pro zadané město. Pokud město není nalezeno, funkce vrací chybu.


### Našeptávač měst
Našeptávač používá JSON soubor se seznamem měst poskytnutý OpenWeather a zobrazuje prvních 10 výsledků při zadání více než 2 znaků.


### Ikony počasí
Pro zobrazení ikon počasí používá aplikace ikony z **Bootstrap Icons**, které jsou nahrány do projektu a zobrazovány podle aktuálního počasí.

## Podporované prohlížeče

Aplikace Počasí byla testována a funguje v následujících prohlížečích:

- **Google Chrome**: verze 129 a novější
- **Mozilla Firefox**: verze 131 a novější
- **Microsoft Edge**: verze 129 a novější
- **Safari**: verze 18 a novější

Aplikace je optimalizována pro moderní prohlížeče s podporou ECMAScript 6 (ES6) a novějších standardů, včetně podpory Fetch API a Flexboxu/Grid layoutu. Starší prohlížeče mohou mít problémy se správným fungováním aplikace.


## Závěr
Aplikace **Počasí** poskytuje předpověď počasí na následujících 5 dní v tříhodinových intervalech pro zadané město. Byla vytvořena pomocí frameworku Next.js s využitím OpenWeather API a Bootstrap ikon. Pro našeptávač měst používá JSON soubor s daty měst od OpenWeather. Aplikace využívá funkcionální přístup k programování a je možné ji nasadit jako statickou aplikaci na libovolný hosting.