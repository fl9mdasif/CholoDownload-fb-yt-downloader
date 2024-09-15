import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const downloadAPi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    downloadFacebook: build.mutation({
      query: (data) => ({
        url: "/download/facebook",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.fDownload],
    }),

    downloadYouTube: build.mutation({
      query: (data) => ({
        url: "/download/youtube",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.ytDownload],
    }),

  
  }),
});

export const {
  useDownloadFacebookMutation,
  useDownloadYouTubeMutation
} = downloadAPi;
