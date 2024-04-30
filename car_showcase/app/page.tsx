import CarCard from "@components/CarCard";
import CustomFiler from "@components/CustomFiler";
import Hero from "@components/Hero";
import SearchBar from "@components/SearchBar";
import SelectBox from "@components/SelectBox";
import { fetchCars } from "@utils";

type SerchParams = {
  manufacturer:string,
  year: number,
  fuel?:string ,
  limit:number,
  model?:string,
}

export default async function Home({searchParams}:any) { // https://www.youtube.com/watch?v=pUNSHPyVryU
  const allCars = await fetchCars({ // 加上参数来 fetch
    manufacturer:searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel:searchParams.fuel || '',
    limit:searchParams.limit || 10,
    model:searchParams.model || '',
  })
  // console.log(allCars) // 测试数据
  const isDataEmpty = !Array.isArray(allCars)|| allCars.length<1|| !allCars
  return (
    <main className="overflow-hidden">
      {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <Hero />
      <div className="mt-12 padding-x padding-y max-width " id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar title={{
            title: ""
          }} />
          {/* <SelectBox /> */}
          <div className="home__filter-container">
          {/* fuel:燃料 */}
          {/* <CustomFiler title='fuel' /> 
          <CustomFiler title='year' /> */}
          </div>
        </div>
          {!isDataEmpty 
          ?(
            <section>
              <div className="home__cars-wrapper">
              {allCars.map((car,idx)=>(
                <CarCard key={idx} car ={car} />
              ))}
              </div>
            </section>
           )
          :(
            <div className="home__error-container">
              <h2 className="text-black text-x1 font-bold">Oops , no results</h2>
              <p>{allCars?.message}</p>
            </div>

          )}
      </div>
    </main>
  );
}
