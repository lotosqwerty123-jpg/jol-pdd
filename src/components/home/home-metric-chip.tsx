import {
    StyleSheet,
    View,
} from 'react-native';
  
  import {
    ThemedText,
} from '@/components/themed-text';
  
  import {
    useTheme,
} from '@/hooks/use-theme';
  
  type Props = {
    label: string;
    value: string;
  };
  
  export function HomeMetricChip({
    label,
    value,
  }: Props) {
    const colors = useTheme();
  
    return (
      <View
        style={[
          styles.root,
  
          {
            backgroundColor:
              colors.surface2,
  
            borderColor:
              colors.border,
          },
        ]}>
  
        <ThemedText
          type="small"
          themeColor="textTertiary">
  
          {label}
        </ThemedText>
  
        <ThemedText
          type="smallBold"
          numberOfLines={1}>
  
          {value}
        </ThemedText>
      </View>
    );
  }
  
  const styles =
    StyleSheet.create({
      root: {
        flex: 1,
  
        minHeight: 54,
  
        borderWidth: 0,
  
        borderRadius: 17,
  
        paddingHorizontal: 12,
        paddingVertical: 9,
  
        justifyContent:
          'center',
  
        gap: 1,
      },
    });