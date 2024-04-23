import { NextApiResponse, NextApiRequest } from "next";
import { people } from "@/app/person/data";
import { Person } from "@/app/person/interfaces";

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Person[]>,
) {
  return res.status(200).json(people);
}