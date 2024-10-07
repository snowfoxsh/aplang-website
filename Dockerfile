# Use the base image
FROM node:18-alpine AS base
LABEL authors="storm"

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependency files and install dependencies using npm
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# install wasm-pack
RUN apk add --no-cache wasm-pack

# Install mdbook (markdown book)
RUN apk add --no-cache mdbook


# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

# Run the pack script before building the application using npm
# RUN npm run pack && npm run build-mdbook && npm run build

# Build aplang for wasm
RUN npm run pack

# build the docs
RUN npm run build-mdbook

# build website with next
RUN npm run build


# Production image, copy all the files, and run Next.js
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from the builder
COPY --from=builder /app/public ./public

# Set the correct permission for the .next directory
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the Next.js build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose the port and set the environment variable
EXPOSE 3000
ENV PORT=3000

# Start the application
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]