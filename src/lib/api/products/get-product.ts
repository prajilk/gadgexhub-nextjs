import axios from "@/config/axios.config";

export async function getProduct(id: string, name: string) {
  const { data } = await axios.get(`/api/products/${id}?name=${name}`);

  // const res = await fetch(
  //   process.env.URL + `/api/products/${id}?name=${name}`,
  //   {
  //     method: "GET",
  //   },
  // );
  // const result = await res.json();
  return data;
}
