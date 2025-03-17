import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { addAuthTools } from "./tools/auth.js";
import { addPropertyTools } from "./tools/properties.js";

const server = new McpServer({
  name: "MCP Real Estate Agent",
  version: "0.1.0"
});

// Add authentication and user management tools
addAuthTools(server);

// Add property management tools
addPropertyTools(server);

const transport = new StdioServerTransport();
await server.connect(transport); 