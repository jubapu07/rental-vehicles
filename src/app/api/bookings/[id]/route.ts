import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["PENDING", "CONFIRMED", "ACTIVE", "COMPLETED", "CANCELLED"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status update" },
        { status: 400 }
      );
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
      include: { vehicle: true },
    });

    return NextResponse.json({
      success: true,
      booking: updated,
      message: `Booking status updated to ${status}`,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
