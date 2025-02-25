import { UserRepository } from '@amityco/ts-sdk-react-native';
import { AmityUserMetadataKeys } from '../enum';

/**
 * Given a community ID, add the community ID to the user's joinedCommunities metadata.
 */
const addToJoinedCommunities = async (userId: string, communityId: string) => {
  try {
    const unsubscribe = await UserRepository.getUser(
      userId,
      async ({ data, loading, error }) => {
        if (!error && !loading) {
          const joinedCommunities: string[] =
            data?.metadata?.joinedCommunities || [];

          if (!joinedCommunities.includes(communityId)) {
            await UserRepository.updateUser(userId, {
              metadata: {
                ...data.metadata,
                [AmityUserMetadataKeys.JoinedCommunities]: [
                  ...joinedCommunities,
                  communityId,
                ],
              },
            });
          }
        }
      }
    );

    return Promise.resolve(unsubscribe());
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Given a community ID, remove the community ID to the user's joinedCommunities metadata.
 */
export const removeFromJoinedCommunities = async (
  userId: string,
  communityId: string
) => {
  try {
    const unsubscribe = await UserRepository.getUser(
      userId,
      async ({ data, loading, error }) => {
        if (!error && !loading) {
          const joinedCommunities: string[] =
            data?.metadata?.joinedCommunities || [];

          if (joinedCommunities.includes(communityId)) {
            await UserRepository.updateUser(userId, {
              metadata: {
                ...data.metadata,
                [AmityUserMetadataKeys.JoinedCommunities]:
                  joinedCommunities?.filter((item) => item !== communityId),
              },
            });
          }
        }
      }
    );

    return Promise.resolve(unsubscribe());
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Given a community ID, set the user's created community ID.
 */
export const setCreatedCommunityId = async (
  userId: string,
  communityId: string
) => {
  try {
    const unsubscribe = await UserRepository.getUser(
      userId,
      async ({ data, loading, error }) => {
        if (!error && !loading) {
          const createdCommunityId: string =
            data?.metadata?.[AmityUserMetadataKeys?.CreatedCommunityId] ?? null;
          const joinedCommunities: string[] =
            data?.metadata?.joinedCommunities || [];

          if (createdCommunityId === communityId) {
            console.info(
              '[Social+]: communityId is equal to createdCommunityId! Ignoring the user update.'
            );
            return;
          }

          await UserRepository.updateUser(userId, {
            metadata: {
              ...data.metadata,
              [AmityUserMetadataKeys.JoinedCommunities]: [
                ...joinedCommunities,
                communityId,
              ],
              [AmityUserMetadataKeys.CreatedCommunityId]: communityId,
            },
          });
        }
      }
    );
    unsubscribe();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Given a community ID, remove the created community Id to user's metadata.
 */
export const deleteCreatedCommunityId = async (
  userId: string,
  communityId: string
) => {
  try {
    const unsubscribe = await UserRepository.getUser(
      userId,
      async ({ data, loading, error }) => {
        if (!error && !loading) {
          const createdCommunityId: string =
            data?.metadata?.[AmityUserMetadataKeys?.CreatedCommunityId] ?? null;
          const joinedCommunities: string[] =
            data?.metadata?.joinedCommunities || [];

          if (createdCommunityId !== communityId) {
            console.info(
              '[Social+]: The communityId is not owned by this user! Ignoring the user update.'
            );
            return;
          }
          // if the community he created is equal to the target community, remove the created community id

          await UserRepository.updateUser(userId, {
            metadata: {
              ...data.metadata,
              [AmityUserMetadataKeys.JoinedCommunities]:
                joinedCommunities.filter((item) => item !== communityId),
              [AmityUserMetadataKeys.CreatedCommunityId]: null,
            },
          })
            .then((resp) => {
              console.log(
                'JPN: deleteCreatedCommunityId is set to ',
                communityId,
                JSON.stringify(resp)
              );
            })
            .catch((error) => {
              console.log('JPN: error setting deleteCreatedCommunityId', error);
            });
        }
      }
    );

    unsubscribe();
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const metadataHandlers = {
  addToJoinedCommunities,
  removeFromJoinedCommunities,
  setCreatedCommunityId,
  deleteCreatedCommunityId,
};

export default metadataHandlers;
