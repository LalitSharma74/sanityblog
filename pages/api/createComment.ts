// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sanityClient from "@sanity/client";
import type { NextApiRequest, NextApiResponse } from "next";
// import { setFlagsFromString } from "v8";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // destructuring / pull apart (_id , name , email , comment) from the form submission that was pushed through stored as the req body
  //   The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. An optional reviver function can be provided to perform a transformation on the resulting object before it is returned.

  const { _id, name, email, comment } = JSON.parse(req.body);

  //   Now creating a document in the sanity CMS

  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: `submit comment`, err });
  }
  console.log("Comment created successfully!");
  return res.status(200).json({ message: "Comment Submitted" });
}
