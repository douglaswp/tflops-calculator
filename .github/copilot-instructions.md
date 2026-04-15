# Copilot Instructions

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

No test suite is configured.

## Architecture

This is a **single-page React app** — all logic and components live in `src/App.jsx` (one file, ~820 lines). There is no routing.

**Data flow:**
1. On mount, `useEffect` fetches three TypeScript source files from `huggingface/huggingface.js` on GitHub (hardware-nvidia.ts, hardware-amd.ts, hardware.ts).
2. Hardware entries are extracted via regex — the files are not imported as modules; they are parsed as raw text.
3. Parsed data is cached in `localStorage` under `hf_hardware_cache`. User-defined hardware is stored under `custom_hardware_list`.
4. Everything is merged, deduped by `name`, sorted by TFLOPS descending, and stored in `hardwareList` state.

**Hardware item shape:**
```js
{ id, type, provider, name, tflops, memory: number[], selectedVram, cost, quantity, includedInTotal }
```
- IDs: `hf_${name}` for HuggingFace entries, `custom_${UUID}` for user-added, `crypto.randomUUID()` for comparison list entries.

**State model (App):**
- `hardwareList` — full catalog (fetched + custom)
- `selectedItems` — comparison list with quantities, cost, and VRAM selections
- `editingId` / `editForm` — inline edit state for the comparison table
- `isDark` — global theme toggle

## Key Conventions

**All UI is in Portuguese (pt-BR):** Labels, error messages, comments, and `console.warn` strings are in Portuguese. Keep this consistent when adding UI text.

**`isDark` prop threading:** Every sub-component receives `isDark` as a prop and applies conditional Tailwind classes (`isDark ? 'bg-slate-800 ...' : 'bg-white ...'`). There is no CSS theming or context — it's passed explicitly everywhere.

**Inline SVG icon components:** All icons are defined as zero-dependency functional components at the top of `App.jsx` (e.g. `CpuIcon`, `GpuIcon`, `TrashIcon`). Add new icons there.

**No external chart or UI library:** `BarChart` and `SearchableSelect` are custom components defined in the same file. Do not introduce charting libraries (recharts, chart.js, etc.) without discussion.

**Currency formatting:** Always use `formatCurrency(value)` which targets `pt-BR` locale and `BRL` currency. Do not use raw `toLocaleString` for monetary values.

**`useMemo` for derived state:** `availableProviders`, `availableModels`, and `chartData` are all memoized. Follow this pattern for any new derived values that depend on `hardwareList` or `selectedItems`.

**ESLint rule:** `no-unused-vars` ignores variables matching `/^[A-Z_]/` — this covers icon components and constants defined but only used in JSX.

**Tailwind class ordering:** Dark-mode variants come before light in ternaries: `isDark ? 'dark-classes' : 'light-classes'`.
