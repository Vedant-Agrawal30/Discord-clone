import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const { inviteCode } = await params;

  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  if (!inviteCode) {
    return redirect("/");
  }

  // Check if user is already a member
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // 🔥 Get server by invite code
  const serverToJoin = await db.server.findFirst({
    where: {
      inviteCode,
    },
  });

  if (!serverToJoin) {
    return redirect("/");
  }

  // 🔥 Join using ID
  const server = await db.server.update({
    where: {
      id: serverToJoin.id,
    },
    data: {
      members: {
        create: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
