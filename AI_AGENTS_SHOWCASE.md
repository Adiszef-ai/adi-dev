# AI Agents Showcase — Plan do Portfolio

Trzy projekty demonstracyjne agentów AI, każdy pokazujący inny aspekt pracy z AI.

---

## 1. Eleven Labs — Thor Conversational Agent 🔨⚡

**Status:** W trakcie budowy

**Opis:**
Konwersacyjny agent głosowy w postaci boga Thora, zbudowany w Eleven Labs z systemem RAG (Retrieval-Augmented Generation). Agent klasyfikuje intencje użytkownika i kieruje rozmowę do odpowiednich subagentów.

**Architektura workflow:**
- **Powitanie i klasyfikacja** — rozpoznaje intencję użytkownika
- **4 subagenty:**
  - Runy Thora — interpretacja run z bazy wiedzy
  - Porady Thora — bezpośrednie, konkretne porady w stylu Thora
  - Mity Thora — opowieści mitologiczne z perspektywy pierwszej osoby
  - Rozmowa z Thorem — swobodna konwersacja
- **Eskalacje** — przejścia między subagentami
- **Ton emocjonalny** — subagent override zmieniający ton odpowiedzi (np. Thor wściekły)

**Tech stack:**
- Eleven Labs (Voice AI + Workflow Builder)
- RAG z bazą wiedzy (mitologia nordycka, runy, porady)
- Klasyfikacja intencji
- System subagentów z eskalacjami

**Co pokazuje w portfolio:**
- Projektowanie złożonych workflow konwersacyjnych
- Praca z voice AI
- Implementacja RAG
- Zarządzanie kontekstem i tonem agenta

**Do zrobienia:**
- [ ] Dokończyć workflow w Eleven Labs
- [ ] Nagrać demo rozmowy (30-60s clip)
- [ ] Zrobić screenshot workflow
- [ ] Opisać case study do portfolio

---

## 2. n8n — AI Content Monitor 📡🤖

**Status:** Do zbudowania

**Opis:**
Automatyczny pipeline monitorujący źródła treści (RSS, social media, strony www), analizujący je za pomocą AI i wysyłający inteligentne powiadomienia. Praktyczny przykład automatyzacji biznesowej z AI.

**Proponowany workflow:**
1. **Trigger** — cykliczny (co X godzin) lub webhook
2. **Źródła danych** — RSS feeds (np. tech blogi, Hacker News) lub API social media
3. **AI Processing:**
   - Podsumowanie artykułów (Claude/OpenAI)
   - Analiza sentymentu
   - Klasyfikacja tematyczna (AI, web dev, startup, etc.)
   - Ocena relevancji (1-10)
4. **Filtrowanie** — tylko treści powyżej progu relevancji
5. **Output:**
   - Powiadomienie Discord/Slack z podsumowaniem
   - Opcjonalnie: zapis do Google Sheets / Notion

**Tech stack:**
- n8n (self-hosted lub cloud)
- Claude API / OpenAI API (do analizy treści)
- Discord/Slack webhook (powiadomienia)
- RSS parser
- Opcjonalnie: Google Sheets API, Notion API

**Co pokazuje w portfolio:**
- Automatyzacja procesów biznesowych
- Integracja wielu serwisów i API
- Praktyczne zastosowanie AI w codziennej pracy
- Projektowanie pipeline'ów danych

**Do zrobienia:**
- [ ] Zainstalować/skonfigurować n8n
- [ ] Zbudować workflow krok po kroku
- [ ] Podłączyć AI do analizy treści
- [ ] Skonfigurować output (Discord/Slack)
- [ ] Zrobić screenshot workflow
- [ ] Nagrać krótkie demo działania
- [ ] Opisać case study do portfolio

---

## 3. Claude MCP — Code Review Agent 💻🔍

**Status:** Do zbudowania

**Opis:**
Lokalny agent deweloperski wykorzystujący Claude z MCP (Model Context Protocol) serwerami do automatycznej analizy kodu. Agent potrafi czytać pliki projektu, analizować jakość kodu, sugerować poprawki i generować raporty.

**Proponowana architektura:**
1. **MCP Servers:**
   - Filesystem server — dostęp do plików projektu
   - Git server — analiza historii zmian
   - Opcjonalnie: GitHub server — integracja z PR/issues
2. **Agent workflow:**
   - Użytkownik wskazuje plik/folder do review
   - Agent czyta kod przez MCP
   - Analizuje: jakość, bezpieczeństwo, wydajność, best practices
   - Generuje raport z sugestiami
3. **Output:**
   - Raport w markdown
   - Konkretne sugestie z numerami linii
   - Ocena ogólna projektu

**Tech stack:**
- Claude API (claude-sonnet-4-6 lub claude-opus-4-6)
- MCP Protocol
- MCP Servers (filesystem, git)
- Python lub Node.js (klient MCP)

**Co pokazuje w portfolio:**
- Znajomość ekosystemu Anthropic/Claude
- Umiejętność konfiguracji i używania MCP
- Budowanie narzędzi deweloperskich z AI
- Praktyczne zastosowanie agentów w procesie development

**Do zrobienia:**
- [ ] Skonfigurować MCP serwery (filesystem + git)
- [ ] Napisać klienta MCP (Python/Node)
- [ ] Zdefiniować prompty do code review
- [ ] Przetestować na realnym projekcie
- [ ] Zrobić screenshot/nagranie sesji
- [ ] Opisać case study do portfolio

---

## Jak to będzie wyglądać w portfolio

Każdy showcase to karta w sekcji **AI Agents** z:
- Nazwa + krótki opis (1-2 zdania)
- Screenshot workflow / interfejsu
- Tech stack badges
- Link do demo (video/audio clip)
- Przycisk "Case Study" z pełnym opisem

**Razem te 3 projekty pokazują:**
| Projekt | Aspekt AI |
|---------|-----------|
| Thor Agent (Eleven Labs) | Voice AI + Konwersacja + RAG |
| Content Monitor (n8n) | Automatyzacja + Integracja + Pipeline |
| Code Review Agent (MCP) | Developer Tooling + Agenty + Ekosystem Claude |
