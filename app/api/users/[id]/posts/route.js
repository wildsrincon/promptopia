import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDatabase();
    console.log("fetch posts")
    const prompts = await Prompt.find({ creator: params.id })
      .populate("creator")
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};