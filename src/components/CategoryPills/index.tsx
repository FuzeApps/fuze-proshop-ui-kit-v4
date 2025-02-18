import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CategoryRepository } from '@amityco/ts-sdk-react-native';
import { amityUIKitTokens } from '../../enum';

const CategoryPills = ({ categoryIds = [] }: { categoryIds: string[] }) => {
  const [categories, setCategories] = useState<Amity.Category[]>([]);

  useEffect(() => {
    const unsubscribeCategory = CategoryRepository.getCategories(
      { limit: 100000 },
      ({ data: categoriesData, loading }) => {
        if (!loading) {
          console.log('categories', categoriesData);

          setCategories(
            categoriesData?.filter((category) =>
              categoryIds.includes(category.categoryId)
            )
          );
        }
      }
    );
    unsubscribeCategory();
  }, [categoryIds]);

  if (!categoryIds.length) return null;

  return (
    <View style={styles.wrapper}>
      {categories?.map((item) => (
        <View key={item?.categoryId} style={styles.pill}>
          <Text style={styles.pillText}>{item?.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CategoryPills;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  pill: {
    backgroundColor: amityUIKitTokens.colors.baseShade4,
    paddingHorizontal: amityUIKitTokens.spacing.xxs2,
    borderRadius: amityUIKitTokens.borderRadius.large,
  },
  pillText: {
    color: amityUIKitTokens.colors.base,
    fontSize: amityUIKitTokens.fontSize.caption1,
    fontWeight: amityUIKitTokens.fontWeight.caption1Regular,
    lineHeight: amityUIKitTokens.lineHeight.caption1,
  },
});
