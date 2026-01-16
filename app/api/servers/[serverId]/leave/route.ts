import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    });

     // if (!server) {
    //   return new NextResponse("Server not found", { status: 404 });
    // }

    // // Check if user is the server owner
    // if (server.profileId === profile.id) {
    //   return new NextResponse("Server owner cannot leave the server. Please delete or transfer ownership first.", { 
    //     status: 400 
    //   });
    // }

    // // Check if user is a member
    // const existingMember = await db.member.findFirst({
    //   where: {
    //     serverId: params.serverId,
    //     profileId: profile.id,
    //   },
    // });

    // if (!existingMember) {
    //   return new NextResponse("You are not a member of this server", { 
    //     status: 400 
    //   });
    // }

    // // Remove the member from the server
    // await db.member.delete({
    //   where: {
    //     id: existingMember.id,
    //   },
    // });

    // // Update server member count
    // await db.server.update({
    //   where: {
    //     id: params.serverId,
    //   },
    //   data: {
    //     membersCount: {
    //       decrement: 1,
    //     },
    //   },
    // });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
