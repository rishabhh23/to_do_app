import { app } from "./app";

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Task API running on http://localhost:${PORT}`);
  console.log(`Swagger Docs: http://localhost:${PORT}/api/docs`);
});
