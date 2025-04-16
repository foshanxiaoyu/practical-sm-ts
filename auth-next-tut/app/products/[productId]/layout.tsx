export default function ProductDetailLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // Throw error 50% of the time
    // const random = getRandomInt(2);
    // if (random === 1) {
    //   throw new Error("Error loading product details");
    // }
    return (
      <>
        <h2 className=" text-wrap text-fuchsia-500">Detail product Page</h2>
        {children}
        <h2 className=" text-wrap text-fuchsia-300">Featured products</h2>
      </>
    );
  }