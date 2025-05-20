import api from "@/services/api";

export const getMovieReviewsCount = async (movieId: number): Promise<number> => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews`, {
      params: {
        language: "en-US",
        page: 1,
      }
    });
    return response.data.total_results || 0;
  } catch (error) {
    console.error(`Error fetching reviews for movie ${movieId}:`, error);
    return 0;
  }
};
