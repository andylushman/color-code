import { List } from '@chakra-ui/react';
import ColorsListItem from './ColorsListItem';
import { Color } from './Colors';

interface ColorsListProps {
  colors: Color[];
}

const ColorsList: React.FC<ColorsListProps> = ({ colors }) => {
  return (
    <List
      display="flex"
      flexWrap="wrap"
      justifyContent={{ base: 'center', md: 'normal' }}
      padding={{ base: 0, md: 5 }}
    >
      {colors.map((color, index) => (
        <ColorsListItem
          key={index}
          name={color.name}
          id={color.id}
          hex={color.hex}
        />
      ))}
    </List>
  );
};

export default ColorsList;
