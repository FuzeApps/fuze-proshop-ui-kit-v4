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
  customerId: string
) => {
  try {
    const unsubscribe = await UserRepository.getUser(
      userId,
      async ({ data, loading, error }) => {
        if (!error && !loading) {
          const joinedCommunities: string[] =
            data?.metadata?.joinedCommunities || [];

          if (joinedCommunities.includes(customerId)) {
            await UserRepository.updateUser(userId, {
              metadata: {
                ...data.metadata,
                [AmityUserMetadataKeys.JoinedCommunities]:
                  joinedCommunities?.filter((item) => item !== customerId),
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

export const metadataHandlers = {
  addToJoinedCommunities,
  removeFromJoinedCommunities,
};

export default metadataHandlers;
