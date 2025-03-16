# MCP User Admin API

A TypeScript implementation of a Model Context Protocol (MCP) server that provides user management functionality for a property rental admin system.

## Overview

This project implements an MCP server that exposes user management operations as MCP tools. It interfaces with a RESTful backend API to provide the following operations:

- User authentication (login)
- User management (create, read, update, delete)
- Access token management

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mcp-userapi.git
cd mcp-userapi

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

```bash
# Start the MCP server
npm start
```

The server runs as an MCP server that can be connected to via stdio or HTTP with SSE transport.

## MCP Tools

This server provides the following tools for user management:

### Authentication

- **login**: Authenticate a user with email and password
  ```typescript
  const result = await client.callTool("login", {
    email: "admin@example.com",
    password: "securepassword123"
  });
  ```

### User Management

- **list-users**: Retrieve all users
  ```typescript
  const result = await client.callTool("list-users", {
    access_token: "your_access_token"
  });
  ```

- **create-user**: Create a new user
  ```typescript
  const result = await client.callTool("create-user", {
    email: "newuser@example.com",
    password: "securepassword123",
    role: "admin" // Optional, defaults to "admin"
  });
  ```

- **get-user**: Get a user by ID
  ```typescript
  const result = await client.callTool("get-user", {
    user_id: "12345678-1234-5678-1234-567812345678",
    access_token: "your_access_token"
  });
  ```

- **update-user**: Update a user's information
  ```typescript
  const result = await client.callTool("update-user", {
    user_id: "12345678-1234-5678-1234-567812345678",
    access_token: "your_access_token",
    email: "updated@example.com", // Optional
    password: "newpassword123", // Optional
    role: "admin" // Optional
  });
  ```

- **delete-user**: Delete a user
  ```typescript
  const result = await client.callTool("delete-user", {
    user_id: "12345678-1234-5678-1234-567812345678",
    access_token: "your_access_token"
  });
  ```

## API Specification

The server follows the OpenAPI specification defined in `.cursor/apispec.json`. Key endpoints include:

- `POST /api/auth/login`: User login
- `GET /api/auth/users`: List all users
- `POST /api/auth/users`: Create a new user
- `GET /api/auth/users/{user_id}`: Get a user by ID
- `PUT /api/auth/users/{user_id}`: Update a user
- `DELETE /api/auth/users/{user_id}`: Delete a user

## Environment Setup

The MCP server expects the backend API to be running at `http://127.0.0.1:5000`. Ensure that the backend API is running before starting the MCP server.

## Technologies

- TypeScript
- Model Context Protocol (MCP)
- Node.js
- Zod for validation

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io) is a standardized protocol that enables applications to provide context for LLMs in a consistent way. This project implements an MCP server that:

- Exposes data through **Resources** (not implemented yet)
- Provides functionality through **Tools** (user management functions)
- Defines interaction patterns through **Prompts** (not implemented yet)

For more information about MCP, visit the [official documentation](https://modelcontextprotocol.io).

## License

MIT 