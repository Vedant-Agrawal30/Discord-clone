import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = (req: Request) => {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new Error("Unauthorized");
  }

  return { userId };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(({ file, metadata }) => {
      return { url: file.url };
    }),

  messageFile: f(["image", "pdf"])
    .middleware(({ req }) => handleAuth(req))
    .onUploadComplete(({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
