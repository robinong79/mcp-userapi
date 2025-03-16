import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { addAuthTools } from "./tools/auth.js";

const server = new McpServer({
  name: "MCP Project",
  version: "0.1.0"
});

// Add authentication and user management tools
addAuthTools(server);

const transport = new StdioServerTransport();
await server.connect(transport); 