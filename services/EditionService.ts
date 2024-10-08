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
    `/api/collection/editions?user_id=${user_id}&edition=ticket-open-edition&page=${page}&limit= 100`
  );

  const editions = res.data.data;

  editions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });

  console.log("editions", editions)
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
    `/api/collection/editions?edition=ticket-open-edition&page=${page}&limit=${limit}`
  );

  const editions = res.data.data;

  editions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });
  console.log(editions,"Edition-data")
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
    `/api/collection/editions?edition=ticket-open-edition&page=${page}&limit=${limit}`
  );

  // console.log("checkUpcomingEditions", res);

  const editions = res.data.data;

  const upcomingEditions = editions.filter((edition: any) => {
    // console.log('Unfiltered public_sale_time:', edition.candyMachine.public_sale_time);
    const publicSaleTime = new Date(edition.candyMachine.public_sale_time);
    return publicSaleTime > new Date(); 
  });

  upcomingEditions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });

  return upcomingEditions;
};

