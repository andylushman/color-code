import { Flex, FormLabel, Input } from '@chakra-ui/react';
import { Color } from './Colors';
import { Dispatch, SetStateAction } from 'react';

interface SearchColorsProps {
  filteredColors: Color[];
  colors: Color[];
  searchInput: string;
  setFilteredColors: Dispatch<SetStateAction<Color[]>>;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

const SearchColors: React.FC<SearchColorsProps> = ({
  filteredColors,
  colors,
  searchInput,
  setFilteredColors,
  setSearchInput
}) => {
  const filterColors = (input: string) => {
    const query = input.toLowerCase();
    setSearchInput(input);

    filteredColors = colors.filter(
      (color) =>
        color.name.toLowerCase().includes(query) ||
        color.hex.toLowerCase().includes(query)
    );
    setFilteredColors(filteredColors);
  };

  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignSelf={{ base: 'center', md: 'baseline' }}
      marginTop={{ base: '25px', md: 0 }}
    >
      <FormLabel alignSelf="center">Search</FormLabel>
      <Input
        name="search"
        value={searchInput}
        type="text"
        placeholder="Search for a color"
        aria-label="Search for a color"
        onChange={(event) => filterColors(event.target.value)}
      />
    </Flex>
  );
};

export default SearchColors;
