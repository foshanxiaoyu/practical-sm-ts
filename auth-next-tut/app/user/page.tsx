import Link from "next/link";
import { Person } from "../person/interfaces";
import { people } from "../person/data";


// export default function page( people: Person[]) {
export default function page() {
  const data :Person[] = people
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>
          <div className="flex text-blue">
            <Link href={`/user/${p.id}`}>{p.name}</Link>
          </div>
        </li>
      ))}
    </ul>
  )
}