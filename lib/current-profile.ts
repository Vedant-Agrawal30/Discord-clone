// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/lib/db";

// export const currentProfile = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return null;
//   }

//   const profile = await db.profile.findUnique({
//     where: {
//       userId,
//     },
//   });

//   return profile;
// };
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const currentProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    profile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return profile;
};
