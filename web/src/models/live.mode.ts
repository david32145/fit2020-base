export type Live = {
    _id: string,
    title: string,
    thumbnailUrl: string,
    streamKey: string,
    status: 'OPENED' | 'CLOSED'
}
