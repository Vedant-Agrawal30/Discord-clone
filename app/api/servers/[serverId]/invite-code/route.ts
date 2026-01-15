import { currentProfile } from "@/lib/current-profile";
import { v4 as uuidv4 } from "uuid"
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ serverId: string }> }
) {
  try {
    // Get current user profile
    const profile = await currentProfile();
    const { serverId } = await context.params;

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 })
    }

    // Check if server exists and user is admin
    const server = await db.server.update({
      where: {
        id: serverId,
        // members: {
        //   some: {
        profileId: profile.id,
        // role: {
        //   in: [MemberRole.ADMIN, MemberRole.MODERATOR]
        // }
        //   }
        // }
      },
      data: {
        // inviteCode: generateInviteCode(), // Your invite code generation function
        inviteCode: uuidv4(), // Temp
      },
      //   include: {
      //     members: true
      //   }
    });

    // if (!server) {
    //   return new Response("Server not found or insufficient permissions", { status: 404 });
    // }

    return NextResponse.json(server)
    // { 
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });

  } catch (error) {
    console.error("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// // Helper function to generate invite code
// function generateInviteCode(): string {
//   return Math.random().toString(36).substring(2, 8).toUpperCase();
// }