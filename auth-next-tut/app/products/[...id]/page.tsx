

export default function page({params}:{params:{id:string}}) {
  return (
    <div>Detail about product  {params.id}</div>
  )
}