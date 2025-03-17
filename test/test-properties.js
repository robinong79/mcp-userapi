// A simple test script to verify the properties endpoint
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addPropertyTools } from "../dist/tools/properties.js";

async function testPropertiesEndpoint() {
  console.log("Testing properties endpoint...");
  
  // Create a test server
  const server = new McpServer({
    name: "Test Server",
    version: "1.0.0"
  });
  
  // Add the property tools
  addPropertyTools(server);
  
  // Log the available tools
  console.log("Available tools:", server.listTools());
  
  // Get a sample access token by logging in
  const accessToken = "your_access_token_here";  // Replace with a valid token
  
  try {
    // Test the list-properties tool
    console.log("Testing list-properties tool...");
    const listTool = server.getTool("list-properties");
    if (!listTool) {
      console.error("list-properties tool not found");
      process.exit(1);
    }
    
    // We're not actually executing the tool here, just verifying it's registered
    console.log("Properties tool is registered correctly");
    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

testPropertiesEndpoint().catch(console.error); 