# NoteHub

A Vite + React + TypeScript notes app for GoIT homework 05.

## Local setup

1. Run `npm install` (Node.js 20.19+ or 22.12+).
2. Copy `.env.example` to `.env.local`.
3. Obtain your personal token from https://notehub-public.goit.study/api/docs/ and set `VITE_NOTEHUB_TOKEN` in `.env.local`.
4. Run `npm run dev`.

The token is read from the environment and must not be committed. Vite embeds `VITE_` values in the browser bundle, so use only the assignment's personal demo token.

## Checks

- `npm run build`
- `npm run lint`
- `npm run format:check`
- `npm test`

## Deployment

Import https://github.com/vosan/05-notehub into Vercel as a Vite project. Set `VITE_NOTEHUB_TOKEN` in the Vercel project environment before building. Use `npm run build` and output directory `dist`. Redeploy after changing the environment variable.

Submit both the repository URL and the resulting Vercel URL. The assignment asks you to wait five minutes after pushing changes before submitting for review.

## Styles

Component styles are copied from the [GoIT NoteHub styles, hw-05 branch](https://github.com/goitacademy/react-notehub-styles/tree/hw-05). See `LICENSE.styles` for the original license.
