# ContactBook

En enkel kontaktlista byggd med React och TypeScript.

## Vad gör applikationen?

Applikationen låter användaren hantera en lista med kontakter.
Man kan lägga till nya kontakter, redigera befintliga, ta bort kontakter samt söka och sortera listan.

## API

Applikationen använder [JSONPlaceholder](https://jsonplaceholder.typicode.com) som är ett gratis och öppet test-API.

## API-anrop

| Metod  | Används till |
|--------|-------------|
| GET    | Hämtar alla kontakter när sidan laddas |
| POST   | Skickas när användaren skapar en ny kontakt |
| PUT    | Skickas när användaren sparar ändringar på en befintlig kontakt |
| DELETE | Skickas när användaren bekräftar borttagning av en kontakt |

## Hur man kör projektet

```bash
npm install
npm run dev
```

Öppna sedan `http://localhost:5173` i webbläsaren.

## Tekniker

- React
- TypeScript
- Vite
- CSS