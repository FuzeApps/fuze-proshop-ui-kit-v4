import {
  CommunityRepository,
  UserRepository,
} from '@amityco/ts-sdk-react-native';
import { useState, useEffect } from 'react';
import { TabName } from '../enum';

export const useAmityGlobalSearchViewModel = (
  searchValue: string,
  searchType: TabName
) => {
  const [onNextCommunityPage, setOnNextCommunityPage] = useState<
    (() => void) | null
  >(null);
  const [onNextUserPage, setOnNextUserPage] = useState<(() => void) | null>(
    null
  );

  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchType === TabName.Communities) {
      setSearchResult(null);
      setIsLoading(true);
      const unsubscribeCommunity = CommunityRepository.getCommunities(
        {
          displayName: searchValue,
          membership: 'all',
          limit: 20,
          sortBy: 'displayName',
        },
        ({ error, loading, data, hasNextPage, onNextPage }) => {
          if (error) {
            setIsLoading(false);
            return setSearchResult(null);
          }
          if (!loading) {
            setIsLoading(false);
            setOnNextCommunityPage(() => (hasNextPage ? onNextPage : null));
            setSearchResult(data);
          }
        }
      );
      return () => unsubscribeCommunity();
    } else if (searchType === TabName.Users) {
      setSearchResult(null);
      setIsLoading(true);
      const unsubscribeUser = UserRepository.getUsers(
        { displayName: searchValue, limit: 20, sortBy: 'displayName' },
        ({ error, loading, data, hasNextPage, onNextPage }) => {
          if (error) {
            setIsLoading(false);
            return setSearchResult(null);
          }
          if (!loading) {
            setIsLoading(false);
            setOnNextUserPage(() => (hasNextPage ? onNextPage : null));
            setSearchResult(data);
          }
        }
      );
      return () => unsubscribeUser();
    } else {
      setSearchResult(null);
      setIsLoading(false);
      return () => {};
    }
  }, [searchType, searchValue]);

  return { searchResult, onNextCommunityPage, onNextUserPage, isLoading };
};
