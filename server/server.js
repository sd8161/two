import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./configs/db.js";

// Clerk
import { clerkMiddleware } from "@clerk/express";

// Inngest
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";

// Routes
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect DB
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Base route
app.get("/", (req, res) => {
  res.send("Server is Live!");
});

// Inngest route (must be above other routes)
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  })
);

// API routes
app.use("/api/show", showRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);


// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
