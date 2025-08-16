import Feather from "@react-native-vector-icons/feather";

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
}) => {
  return <Feather size={28} {...props} />;
};
