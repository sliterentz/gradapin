# Use the official Node.js image as the base image
FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and package-lock.json to the working directory
COPY package.json ./ 
COPY pnpm-lock.yaml* pnpm-workspace.yaml* ./

# Install dependencies using pnpm
RUN if [ -f pnpm-lock.yaml ]; then \
        pnpm install --frozen-lockfile; \
    else \
        pnpm install; \
    fi

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN pnpm run build

# Stage 2: Production
FROM node:22-alpine AS production

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=9500

# Create and set the working directory inside the container
WORKDIR /app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the .env file to the production stage
COPY .env .env

# Change ownership to the non-root user
RUN chown -R appuser:appgroup .
USER appuser

# Expose the application port
EXPOSE 9500

# Command to run the application
CMD ["node", "dist/main.js"]