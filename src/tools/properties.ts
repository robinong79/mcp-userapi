import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fetch from "node-fetch";

// Response schemas based on the API spec
const PropertySchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  description: z.string().optional(),
  price: z.number(),
  bedrooms: z.number().int(),
  bathrooms: z.number(),
  size: z.number(),
  available: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
});

export function addPropertyTools(server: McpServer) {
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

  // List properties tool
  server.tool(
    "list-properties",
    {
      access_token: z.string()
    },
    async ({ access_token }) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/properties', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.statusText}`);
        }

        const properties = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(properties, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );
} 