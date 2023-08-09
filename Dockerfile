# Stage 1: Installing Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Building the Application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set the environment variable to disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma files and build the Next.js application
RUN npx prisma generate && npm run build

# Stage 3: Running the Application
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a user 'pv' with the corresponding UID and GID
ARG USER_UID
ARG USER_GID
RUN addgroup -g $USER_GID pv && adduser -D -G pv -u $USER_UID pv

# Copy necessary files from the builder stage and set permissions
COPY --from=builder --chown=pv:pv /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set the user to 'pv'
USER pv

# Expose the port
EXPOSE 3000

# Set the port environment variable
ENV PORT 3000

# Start the application
CMD ["npm", "start"]
