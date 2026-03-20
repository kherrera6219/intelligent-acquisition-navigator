# Deployment Guide — ProcurityIQ

ProcurityIQ is a static SPA — any platform that can serve a Vite build works. Below are instructions for the most common options.

---

## Prerequisites

Before deploying, ensure you have:

- A production [Anthropic API key](https://console.anthropic.com/)
- The Supabase project credentials (pre-filled defaults work out of the box)
- (Optional) A SAM.gov API key for live opportunity search

---

## Option 1 — Netlify (Recommended)

### One-click deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kherrera6219/intelligent-acquisition-navigator)

### Manual steps

1. **Connect your repository** in the Netlify dashboard.

2. **Build settings**:
   | Setting | Value |
   |---------|-------|
   | Build command | `npm run build` |
   | Publish directory | `dist` |
   | Node version | `18` (set in Environment → Node.js version) |

3. **Environment variables** (Site settings → Environment variables):
   ```
   VITE_ANTHROPIC_API_KEY   = sk-ant-...
   VITE_SAM_GOV_API_KEY     = (optional)
   ```

4. **SPA redirect** — create `public/_redirects`:
   ```
   /*    /index.html    200
   ```
   This ensures React Router handles all routes.

5. Deploy — Netlify will rebuild on every push to `main`.

---

## Option 2 — Vercel

1. Import the repository from the Vercel dashboard.

2. **Framework preset**: select **Vite**.

3. **Environment variables** (Project → Settings → Environment Variables):
   ```
   VITE_ANTHROPIC_API_KEY   = sk-ant-...
   VITE_SAM_GOV_API_KEY     = (optional)
   ```

4. Vercel automatically handles SPA routing for Vite projects — no extra config needed.

---

## Option 3 — Self-hosted (Nginx)

### Build

```bash
# Set production env vars
export VITE_ANTHROPIC_API_KEY=sk-ant-...
export VITE_SAM_GOV_API_KEY=...

npm run build
# Output: dist/
```

### Nginx config

```nginx
server {
    listen 80;
    server_name procurityiq.example.gov;

    root /var/www/procurityiq/dist;
    index index.html;

    # SPA routing — serve index.html for all paths
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header Referrer-Policy strict-origin-when-cross-origin;
    add_header Content-Security-Policy "default-src 'self'; connect-src 'self' https://*.supabase.co https://api.anthropic.com https://api.sam.gov; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data:;";

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### HTTPS

Use Certbot + Let's Encrypt:

```bash
certbot --nginx -d procurityiq.example.gov
```

---

## Option 4 — Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_ANTHROPIC_API_KEY
ARG VITE_SAM_GOV_API_KEY
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build and run

```bash
docker build \
  --build-arg VITE_ANTHROPIC_API_KEY=sk-ant-... \
  -t procurityiq:latest .

docker run -p 8080:80 procurityiq:latest
```

---

## Moving AI to Server-Side (Supabase Edge Function)

If you need to keep the Anthropic API key off the client, deploy a Supabase Edge Function:

1. **Create the function**:
   ```bash
   supabase functions new claude-ai
   ```

2. **Add the handler** (`supabase/functions/claude-ai/index.ts`):
   ```typescript
   import Anthropic from 'npm:@anthropic-ai/sdk';

   const client = new Anthropic({ apiKey: Deno.env.get('ANTHROPIC_API_KEY') });

   Deno.serve(async (req) => {
     const { messages } = await req.json();
     const response = await client.messages.create({
       model: 'claude-opus-4-6',
       max_tokens: 16000,
       messages,
     });
     return Response.json({ choices: [{ message: { content: response.content[0].text } }] });
   });
   ```

3. **Set the secret**:
   ```bash
   supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
   ```

4. **Deploy**:
   ```bash
   supabase functions deploy claude-ai
   ```

5. **Update `aiService.ts`** to call the Edge Function URL instead of the Anthropic SDK directly.

---

## Environment Variable Reference

| Variable | Required | Notes |
|----------|:--------:|-------|
| `VITE_ANTHROPIC_API_KEY` | ✅ | Set as a secret in your deployment platform |
| `VITE_SAM_GOV_API_KEY` | ☐ | Free key from sam.gov; demo mode without it |
| `VITE_SUPABASE_URL` | Pre-filled | Override only if you forked the Supabase project |
| `VITE_SUPABASE_ANON_KEY` | Pre-filled | Public anon key — safe to expose |
| `VITE_PINECONE_API_KEY` | ☐ | Required only for knowledge-base RAG feature |

> **Important**: All `VITE_*` variables are embedded in the build at compile time. Do not use `VITE_*` prefix for secrets that should never reach the browser. Use server-side solutions (Edge Functions) for those.
