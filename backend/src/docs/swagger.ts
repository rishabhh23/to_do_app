export const swaggerSpec = {
  openapi: "3.0.0",
  info: { title: "Task Manager API", version: "1.0.0" },
  paths: {
    "/api/tasks": {
      get: {
        summary: "List tasks",
        parameters: [
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "pageSize", in: "query", schema: { type: "integer" } },
          { name: "status", in: "query", schema: { type: "string" } },
          { name: "title", in: "query", schema: { type: "string" } },
        ],
        responses: { 200: { description: "OK" } },
      },
      post: {
        summary: "Create task",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TaskInput" },
            },
          },
        },
        responses: { 201: { description: "Created" } },
      },
    },
    "/api/tasks/{id}": {
      get: {
        summary: "Get task",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: {
          200: { description: "OK" },
          404: { description: "Not found" },
        },
      },
      put: {
        summary: "Update task",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: {
          200: { description: "Updated" },
          404: { description: "Not found" },
        },
      },
      delete: {
        summary: "Delete task",
        parameters: [{ name: "id", in: "path", required: true }],
        responses: {
          204: { description: "Deleted" },
          404: { description: "Not found" },
        },
      },
    },
  },
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          status: {
            type: "string",
            enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
          },
          createdAt: { type: "string" },
          updatedAt: { type: "string" },
        },
      },
      TaskInput: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          status: { type: "string" },
        },
      },
    },
  },
};
