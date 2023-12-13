import { publicRequest } from "@/services/fetcher";

export const getOpenEditionsOfUser = async ({
  page,
  limit,
  user_id,
}: {
  page: number;
  limit: number;
  user_id: string;
}) => {
  const res = await publicRequest.get(
    `/api/collection/editions?user_id=${user_id}&edition=open-edition&page=${page}&limit=${limit}`
  );

  return res.data.data;
};
