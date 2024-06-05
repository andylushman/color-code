import { Flex, FormLabel, Input } from '@chakra-ui/react';

interface SearchColorsProps {
  searchInput: string;
  filterColors: (input: string) => void;
}

const SearchColors: React.FC<SearchColorsProps> = ({
  searchInput,
  filterColors
}) => {
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
