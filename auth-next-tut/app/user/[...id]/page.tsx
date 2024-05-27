// import { people } from "../../person/data"
import { people } from "@/app/person/data"
import { Person } from "../../person/interfaces"

type Props = { params: { id: string } }

const data: Person[] = people
// datas.map((p)=> console.log(p))

async function getData() {
  const res = await fetch('/api/people')
  console.log(res.json())
  return res.json()
  // .then(res=>res.json()).then((json)=>console.log(json))
}
export default async function HandelUser({ params }: Props) {
  let isValidating: boolean = false
  // console.log(params.id)
  // const datas :any[] = await getData() 
  // const datas: any[] = people.map((p)=>p.id == params.id)
  const datas: Person[] = people.filter((p) => p.id == params.id)
  return (
    <table>

      {/* <div className=" to-blue-600 text-center text-cyan-400 mt-4 py-1 px-3 gap-4"></div><div className="gap-3 px-3 mx-1"></div><div className="gap-3 px-3 mx-1"></div> */}
      <thead>
        <tr >
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair color</th>
          <th>Skin color</th>
          <th>Eye color</th>
          <th>Gender</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          {isValidating ? (
            <td colSpan={7} align="center">
              Validating...
            </td>
          ) : (
            <>
              {datas.map((el, i) =>
                // {data.map((el, i) =>

                <div className="flex text-wrap " key={i} >
                  <td >{el.name}</td>
                  <td >{el.height}</td>
                  <td >{el.mass}</td>
                  <td >{el.hair_color}</td>
                  <td >{el.skin_color}</td>
                  <td >{el.eye_color}</td>
                  <td >{el.gender}</td>
                </div>

              )}
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
}