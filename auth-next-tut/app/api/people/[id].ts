import { NextApiRequest, NextApiResponse } from "next";
import { people } from "@/app/person/data";;
import type { Person, ResponseError } from "@/app/person/interfaces";

export default function personHandler(
  req: NextApiRequest,
  res: NextApiResponse<Person | ResponseError>,
) {
  const { query } = req;
  const { id } = query;
  const person = people.find((p) => p.id === id);

  // User with id exists
  return person
    ? res.status(200).json(person)
    : res.status(404).json({ message: `User with id: ${id} not found.` });
}