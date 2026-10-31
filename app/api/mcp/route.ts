import { createMcpHandler } from "mcp-handler";
import { registerSiteTools, SERVER_INFO, INSTRUCTIONS } from "@/lib/mcp";

// MCP over Streamable HTTP, stateless: the 2026-07-28 spec, plus the 2025-era
// fallback for older clients. Connect with:
//   claude mcp add --transport http trista https://<site>/api/mcp
const handler = createMcpHandler(registerSiteTools, { serverInfo: SERVER_INFO, instructions: INSTRUCTIONS });

export { handler as GET, handler as POST, handler as DELETE };
