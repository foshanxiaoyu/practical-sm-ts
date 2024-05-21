

const Docs = ({params,}:{params:{slug:string[]}}) => {
  
    if(params.slug.length===2){
    return (
    <div>Docs home page {params.slug[0]} -- Featured and concepts  {params.slug[1]}</div>
  )} else if(params.slug.length===1){ return (<div>Docs home page {params.slug[0]} -- Featured </div>)}
  else { return (<div>Docs home page params.sulg=== {params.slug}</div>)}
}

export default Docs