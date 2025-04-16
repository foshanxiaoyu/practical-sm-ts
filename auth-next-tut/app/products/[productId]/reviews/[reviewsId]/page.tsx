

const ReviewDetail = ({
  params,
}: {
  params: {
    productId: string,
    reviewsId: string,
  }
}) => {
  return (
    <div className="w-80 h-80 bg-gray-200 rounded-full">
      <div className=" absolute w-80 h-80 bg-gray-200 rounded-full mt-[-8px] ml-[-8px] border-t-8 border-l-8 border-gray-400">
        <div className=" relative top-32 left-3 text-center flex flex-auto justify-center items-center ">
          ReviewDetail -- {params.reviewsId} ,  ==for product --  {params.productId}
        </div>
      </div>
    </div>

  )
}

export default ReviewDetail