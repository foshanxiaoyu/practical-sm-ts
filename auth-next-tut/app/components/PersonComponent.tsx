import Link from "next/link";
import { Person } from "@/app/person/interfaces";

type PersonProps = {
  person: Person;
};

export default function PersonComponent({ person }: PersonProps) {
  return (
    <li>
      <Link key={person.id} href="/person/[id]" as={`/person/${person.id}`}>
        {person.name}
      </Link>
    </li>
  );
}