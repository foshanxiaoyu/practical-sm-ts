import { NextApiResponse, NextApiRequest } from "next";
import { people } from "@/app/person/data";
import { Person } from "@/app/person/interfaces";

 const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<Person[]>,
) => {
    console.log('res')
  // return res.redirect('/')
  return res.status(200).json(people)
  // return res.status(200).json(people);
}

export default  handler  // as GET ; handler as POST 
// export default { handler as GET , handler as POST }