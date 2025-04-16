
export async function GET(request:any) {
    const users = [
        {id:1,name:'John'},
        {id:3,name:'Tom'},
        {id:2,name:'Jack'},
    ]
  return await new Response(JSON.stringify(users))
}