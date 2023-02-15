import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: 'r3nlzub1',
    dataset: 'production',
    apiVersion: '2023-01-24',
    token: process.env.SANITY_TOKEN ,
    useCdn: true 
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: string) => builder.image(source);