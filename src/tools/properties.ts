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

// Create/Update property schema (without id and timestamps)
const PropertyInputSchema = z.object({
  name: z.string(),
  address: z.string(),
  description: z.string().optional(),
  price: z.number(),
  bedrooms: z.number().int(),
  bathrooms: z.number(),
  size: z.number(),
  available: z.boolean()
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

  // Get property by ID tool
  server.tool(
    "get-property",
    {
      property_id: z.string(),
      access_token: z.string()
    },
    async ({ property_id, access_token }) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/properties/${property_id}`, {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch property: ${response.statusText}`);
        }

        const property = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(property, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );

  // Create property tool
  server.tool(
    "create-property",
    {
      name: z.string(),
      address: z.string(),
      description: z.string().optional(),
      price: z.number(),
      bedrooms: z.number().int(),
      bathrooms: z.number(),
      size: z.number(),
      available: z.boolean(),
      access_token: z.string()
    },
    async (params) => {
      try {
        const { access_token, ...propertyData } = params;
        
        const response = await fetch('http://127.0.0.1:5000/api/properties', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
          body: JSON.stringify(propertyData)
        });

        if (!response.ok) {
          throw new Error(`Failed to create property: ${response.statusText}`);
        }

        const property = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(property, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );

  // Update property tool
  server.tool(
    "update-property",
    {
      property_id: z.string(),
      name: z.string().optional(),
      address: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      bedrooms: z.number().int().optional(),
      bathrooms: z.number().optional(),
      size: z.number().optional(),
      available: z.boolean().optional(),
      access_token: z.string()
    },
    async (params) => {
      try {
        const { property_id, access_token, ...updateData } = params;
        
        // Only include fields that are provided
        const updatePayload = Object.fromEntries(
          Object.entries(updateData).filter(([_, value]) => value !== undefined)
        );
        
        const response = await fetch(`http://127.0.0.1:5000/api/properties/${property_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          },
          body: JSON.stringify(updatePayload)
        });

        if (!response.ok) {
          throw new Error(`Failed to update property: ${response.statusText}`);
        }

        const property = await response.json();
        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify(property, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );

  // Delete property tool
  server.tool(
    "delete-property",
    {
      property_id: z.string(),
      access_token: z.string()
    },
    async ({ property_id, access_token }) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/properties/${property_id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to delete property: ${response.statusText}`);
        }

        return {
          content: [{ 
            type: "text" as const, 
            text: JSON.stringify({ message: "Property deleted successfully" }, null, 2)
          }]
        };
      } catch (error: unknown) {
        return handleError(error);
      }
    }
  );
} 