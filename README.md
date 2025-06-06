# Pathstream React Project

## Dependencies

-   Node v23+
-   [pnpm (optional)](https://pnpm.io/)

## Setup

-   `npm install` or `pnpm install`
-   Copy `.env.example` to `.env`
-   Set `VITE_API_NINJAS_API_KEY` value in `.env`
-   Run server using `npm dev` or `pnpm dev`
-   Load `http://localhost:3000`

## Organization

-   `main` branch: useEffect implementation
-   `reactquery` branch: React Query implementation

## Design Considerations

1. Used `vite` to easily stand-up a local env
1. Used vanilla CSS vs. Tailwind due to smaller footprint
1. Used uncontrolled form inputs; form was small, didn't need state managed in React
1. Used simple text inputs; for prod app would use `select` for country populated by API
1. Use native form validation; for prod app would use customized error messaging
