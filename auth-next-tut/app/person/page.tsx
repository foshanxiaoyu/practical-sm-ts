import useSWR from 'swr';
import PersonComponent from "../../components/PersonComponent";
import type { Person } from "@/app/person/interfaces";


const fetcher = (url: string) => fetch(url).then((res) => res.json());
const urlKey :string  =  `/api/people`
// const urlKey :Key  = 'http://localhost:20000/api/people'

export default function Page() {
  // const { data, error, isLoading } = useSWR<any,any,string>(urlKey, fetcher);
  const { data, error, isLoading } = useSWR<Person[]>(urlKey, fetcher);
  // const { data, error, isLoading } = useSWR<Person[]>(, fetcher);
  console.log(data)

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    // <>PERSON_Page</>
    <ul >
      {data.map((p:any,i) => (
        <PersonComponent key={i} person={p} />
      ))}
    </ul>
  );
}