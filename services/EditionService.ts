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
  // console.log(editions,"Edition-data")
  return editions;
};

export const getUpcomingEditions = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  // Fetching the editions data from getAllEditions instead of making API request
  const editions = await getAllEditions({ page, limit });

  const upcomingEditions = editions.filter((edition: any) => {
    const publicSaleTime = new Date(edition.candyMachine.public_sale_time);
    return publicSaleTime > new Date();
  });

  upcomingEditions.map((edition: any) => {
    edition.image = getCachedUrlOfImage(edition.image);
  });

  return upcomingEditions;
};

  export const getLiveEditions = async ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    // Fetching the editions data from getAllEditions instead of making API request
    const editions = await getAllEditions({ page, limit });

    // Filtering live editions based on sale time
    const liveEditions = editions.filter((edition: any) => {
      const publicSaleTime = new Date(edition.candyMachine.public_sale_time);
      const endTime = new Date(edition.ends_at); // Assuming there's an end_time field
      const currentTime = new Date();

      // Checking if current time is within the public sale period
      return currentTime >= publicSaleTime && currentTime <= endTime;
    });

    // Map the editions to cache images
    liveEditions.map((edition: any) => {
      edition.image = getCachedUrlOfImage(edition.image);
    });

    return liveEditions;
  };
