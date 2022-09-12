import { createCurrentUserHook, createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
export const config = {
  /** 
     *  find your project Id and datset in "sanity.json" in your studio project
     * These are consdidered "public" , but you can use environment variables.
     * If you want to differ local dev and production
     * 
     * 
     * https://nextjs.org/docs/basic-features/environment-variables

**/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2021-03-25",

  /**
   * Set useCdn to 'false' if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive )
   * Authentication request (like preview will always bypass the CDN)
   */
  useCdn: process.env.NODE_ENV === "production",
};

// MOST IMOORTANT !!! Set up the client for fetching dta in the getProps page functions

// ?THIS IS USED TO FETCH INFORMATION , MAKE QUERIES TO SANITY BACK-END --------->

export const sanityClient = createClient(config);

/**
 * Set up a helper function for generating image URLs with only the asset referance data in your documents
 * https://www.sanity.io/docs/image-url
 */

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Helper function for using the current logged in user account

export const useCurrentUser = createCurrentUserHook(config);
