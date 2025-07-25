import { serve } from "@upstash/workflow/nextjs";
import {db} from "@/database/drizzle";
import {users} from "@/database/schema";
import {eq} from "drizzle-orm";
import {sendEmail} from "@/lib/workflow";

type UserState = "non-active" | "active";


type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
  if (user.length === 0) {
    return "non-active"; // Default state if user not found
  }
  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
      timeDifference > THREE_DAYS_IN_MS &&
      timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active"
  }
  else {
    return "active";
  }

}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome email-
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to the platform!",
      message: `Hello ${fullName}, welcome to the platform!`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Are you still there?",
            message: `Hello ${fullName}, we noticed you haven't been active for a while. We miss you!`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: 'Thanks for staying active!',
            message: `Hello ${fullName}, thank you for staying active on our platform! We appreciate your engagement.`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

