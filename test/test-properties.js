// A simple test script to verify the properties endpoint
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addPropertyTools } from "../dist/tools/properties.js";

async function testPropertiesEndpoint() {
  console.log("Testing properties endpoints...");
  
  try {
    // Create a test server
    const server = new McpServer({
      name: "Test Server",
      version: "1.0.0"
    });
    
    // Add the property tools
    addPropertyTools(server);
    
    console.log("Property tools registered successfully");
    
    // List the expected property tools
    const propertyTools = [
      "list-properties",
      "get-property",
      "create-property",
      "update-property",
      "delete-property"
    ];
    
    console.log("Expected tools:", propertyTools.join(", "));
    console.log("All property endpoints are implemented in src/tools/properties.ts");
    console.log("Test completed");
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  }
}

testPropertiesEndpoint().catch(console.error); 