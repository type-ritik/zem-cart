const { startServer } = require("./src/index");

async function main() {
  const app = await startServer();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Error starting the server:", error);
});
