import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fetch from "node-fetch";

// Response schemas based on the API spec
const TokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.literal("Bearer")
});

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(["admin"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

export function addAuthTools(server: McpServer) {
  const handleError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      content: [{ 
        type: "text" as const, 
        text: `Error: ${errorMessage}` 
      }],
      isError: true
    };
  };

  // Login tool
  server.tool(
    "login",
    {
      email: z.string().email(),
      password: z.string()
    },
    async ({ email, password }) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          throw new Error(`Login failed: ${response.statusText}`);
        }

        const data = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(data, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );

  // List users tool
  server.tool(
    "list-users",
    {
      access_token: z.string()
    },
    async ({ access_token }) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/users', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const users = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(users, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );

  // Create user tool
  server.tool(
    "create-user",
    {
      email: z.string().email(),
      password: z.string().min(8),
      role: z.enum(["admin"]).optional()
    },
    async ({ email, password, role }) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            role: role || 'admin'
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to create user: ${response.statusText}`);
        }

        const user = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(user, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );
} 