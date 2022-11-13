import type { PlayListDocument } from '@datasource/mongo/models';
import { PlayList } from '@datasource/mongo/models';

type TCreateNewPlayListInput = {
  name: string;
  description?: string;
  owner: string;
  songs?: string[];
  isLikedTrack?: boolean;
};

type TPlaylist = {
  id: string;
  name: string;
  description?: string;
};

function getPlaylistResponse(playlist: PlayListDocument): TPlaylist {
  const { _id, __v, ...playListResponse }: PlayListDocument = playlist;

  return {
    id: _id.toString(),
    ...playListResponse,
  } as TPlaylist;
}

export const createNewPlaylist = async (
  input: TCreateNewPlayListInput
): Promise<TPlaylist> => {
  const newPlaylist = await PlayList.create(input);

  const playlist: PlayListDocument = newPlaylist.toObject();

  return getPlaylistResponse(playlist);
};
