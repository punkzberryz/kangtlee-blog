FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# RUN \
#     if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#     elif [ -f package-lock.json ]; then npm ci; \
#     elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#     else echo "Lockfile not found." && exit 1; \
#     fi

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# DEBUG: Now this will actually show files
RUN ls -la 

# Install dependencies
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else \
      echo "CRITICAL ERROR: No lockfile found!" && \
      ls -la && \
      exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Accept build-time arguments
ARG DATABASE_URL
ARG DIRECT_URL
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ARG NEXT_PUBLIC_URL
ARG GOOGLE_SHEETS_CLIENT_EMAIL
ARG GOOGLE_SHEETS_PRIVATE_KEY_B64
ARG NEXT_PUBLIC_CLOUDINARY_NAME
ARG SIGNUP_ADMIN_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG MAILER_EMAIL
ARG MAILER_PASSWORD

# Set them as environment variables for build-time commands
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV NEXT_PUBLIC_URL=$NEXT_PUBLIC_URL
ENV GOOGLE_SHEETS_CLIENT_EMAIL=$GOOGLE_SHEETS_CLIENT_EMAIL
ENV NEXT_PUBLIC_CLOUDINARY_NAME=$NEXT_PUBLIC_CLOUDINARY_NAME
ENV SIGNUP_ADMIN_SECRET=$SIGNUP_ADMIN_SECRET
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET
ENV MAILER_EMAIL=$MAILER_EMAIL
ENV MAILER_PASSWORD=$MAILER_PASSWORD

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN echo "Building the app"
# ENV GENERATE_SOURCEMAP false
#see https://stackoverflow.com/questions/62663167/dockerizing-react-in-production-mode-fatal-error-ineffective-mark-compacts-nea

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable pnpm && pnpm prisma generate

RUN export GOOGLE_SHEETS_PRIVATE_KEY=$(echo "$GOOGLE_SHEETS_PRIVATE_KEY_B64" | base64 -d) && \
    corepack enable pnpm && \
    pnpm run build


# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
