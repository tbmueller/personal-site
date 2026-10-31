// @vitest-environment node
import { afterEach, describe, expect, it } from "vitest";
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { GET, POST, DELETE } from "@/app/api/mcp/route";
import { findProject, SERVER_INFO } from "@/lib/mcp";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { indexMd, llmsTxt } from "@/lib/markdown";

// Talk to the route handler directly, with the official MCP client: no server needed.
const handlers: Record<string, (req: Request) => Promise<Response>> = { GET, POST, DELETE };
const routeFetch = (url: string | URL, init?: RequestInit) => {
  const req = new Request(url, init);
  return handlers[req.method](req);
};

let client: Client | undefined;
afterEach(async () => {
  await client?.close();
  client = undefined;
});

async function connect() {
  client = new Client({ name: "test", version: "0" });
  await client.connect(new StreamableHTTPClientTransport(new URL("http://localhost/api/mcp"), { fetch: routeFetch }));
  return client;
}

describe("MCP server", () => {
  it("introduces itself, with instructions", async () => {
    const c = await connect();
    expect(c.getServerVersion()).toMatchObject(SERVER_INFO);
    expect(c.getInstructions()).toContain(profile.name);
  });

  it("offers three read-only tools", async () => {
    const { tools } = await (await connect()).listTools();
    expect(tools.map((t) => t.name).sort()).toEqual(["get_about", "get_project", "list_projects"]);
    for (const t of tools) expect(t.annotations).toMatchObject({ readOnlyHint: true, openWorldHint: false });
  });

  it("get_about returns the profile", async () => {
    const res = await (await connect()).callTool({ name: "get_about", arguments: {} });
    expect(res.structuredContent).toMatchObject({ name: profile.name, headline: profile.headline, work: profile.work, skills: profile.skills });
    expect((res.content as { text: string }[])[0].text).toContain(profile.outside);
  });

  it("list_projects returns every project", async () => {
    const res = await (await connect()).callTool({ name: "list_projects", arguments: {} });
    const listed = (res.structuredContent as { projects: { name: string }[] }).projects;
    expect(listed.map((p) => p.name)).toEqual(projects.map((p) => p.name));
  });

  it("get_project finds a project however its name is typed", async () => {
    const res = await (await connect()).callTool({ name: "get_project", arguments: { name: "drill-room" } });
    expect(res.isError).toBeFalsy();
    expect(res.structuredContent).toMatchObject({ name: "Drill Room" });
  });

  it("get_project explains what exists when there's no match", async () => {
    const res = await (await connect()).callTool({ name: "get_project", arguments: { name: "trading cards" } });
    expect(res.isError).toBe(true);
    for (const p of projects) expect((res.content as { text: string }[])[0].text).toContain(p.name);
  });

  it("serves the whole site as a Markdown resource", async () => {
    const res = await (await connect()).readResource({ uri: "site://index.md" });
    expect(res.contents[0]).toMatchObject({ mimeType: "text/markdown", text: indexMd() });
  });

  it("answers 2025-era clients too", async () => {
    const res = await POST(
      new Request("http://localhost/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
        body: JSON.stringify({
          jsonrpc: "2.0", id: 1, method: "initialize",
          params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "old", version: "1" } },
        }),
      }),
    );
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain('"protocolVersion":"2025-06-18"');
    expect(body).toContain(SERVER_INFO.name);
  });
});

describe("findProject", () => {
  it("ignores case and punctuation", () => {
    expect(findProject("SPLITWISE MCP")?.name).toBe("splitwise-mcp");
    expect(findProject("welcome_mat")?.name).toBe("Welcome Mat");
    expect(findProject("nope")).toBeUndefined();
  });
});

describe("discovery", () => {
  it("llms.txt points agents at the MCP server", () => {
    expect(llmsTxt()).toContain("- [MCP server](/api/mcp):");
  });
});
