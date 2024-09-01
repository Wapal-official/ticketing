import { publicRequest } from "@/services/fetcher";
import { creatorStudioRequest } from "@/services/CreatorStudioInterceptor";
import { getCachedUrlOfImage } from "@/utils/imageCache";

export const getOpenEditionsOfUser = async ({
  page,
  limit,
  user_id,
}: {
  page: number;
  limit: number;
  user_id: string;
}) => {
  const res = await creatorStudioRequest.get(
    `/api/collection/editions?user_id=${user_id}&edition=open-edition&page=${page}&limit=${limit}`
  );

  const editions = res.data.data;

  editions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });

  return editions;
};

export const getAllEditions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await publicRequest.get(
    `/api/collection/editions?page=${page}&limit=${limit}&edition=open-edition&isApproved=true`
  );

  const editions = res.data.data;

  editions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });

  return editions;
};

export const getUpcomingEditions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const res = await publicRequest.get(

    `/api/collection/edition/upcoming?page=${page}&limit=${limit}&edition=open-edition&isApproved=true`
  );
  console.log("checkUpcomingEditions",res)
//   mounted(){
//   console.log(this.getUpcomingEditions);  
// }

  const editions = res.data.data;

  editions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });

  return editions;
};
