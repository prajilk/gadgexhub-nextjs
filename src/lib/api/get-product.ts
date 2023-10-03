export async function getProduct(id: string, name: string) {
  const res = await fetch(
    process.env.URL + `/api/products/${id}?name=${name}`,
    {
      method: "GET",
    },
  );
  const result = await res.json();
  return result;
}
