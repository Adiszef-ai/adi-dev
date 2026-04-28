# Project preview images

Wrzuć tutaj screenshoty/preview obrazki projektów. Nazwy muszą się zgadzać z `image` field w `src/sections/Projects.tsx`:

- `career-guide.png` — preview Career Guide
- `runewitch.png` — preview RuneWitch
- `rybaika.png` — preview Rybaika
- `akasha.png` — preview Akasha (lub usuń pole `image` z definicji projektu jeśli nie chcesz pokazywać)

**Format zalecany:**
- aspect ratio: 16:9 (lub bardzo bliski)
- min width: 1200px (dla retina)
- format: PNG/JPG/WebP — WebP najlepszy (mniejszy)
- waga: < 200KB każdy (użyj squoosh.app jeśli za duże)

**Co na obrazku:**
- Hero shot apki: główny ekran lub najmocniejszy view
- Czysty UI bez personal danych / loginu
- Light overlay z aury jest nakładany automatycznie przez `ProjectImage` component — nie musisz tego dorabiać

**Jeśli plik nie istnieje** → karta automatycznie pokazuje gradient placeholder z tytułem projektu nadrukowanym (Aura kolor zgodny z `aura` field). Nie ma broken image icon.
