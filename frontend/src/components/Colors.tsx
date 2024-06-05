import { createContext, useEffect, useState } from 'react';
import ColorsList from './ColorsList';
import Header from './Header';
import { getColors } from '../api';
import AddColor from './AddColor';
import SearchColors from './SearchColors';
import { Divider, Flex } from '@chakra-ui/react';

export interface Color {
  id: string;
  name: string;
  hex: string;
}

export const ColorsContext = createContext({
  colors: [] as Color[],
  fetchColors: () => {}
});

const Colors = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [filteredColors, setFilteredColors] = useState<Color[]>([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchColors();
  }, []);

  const filterColors = (input: string) => {
    const query = input.toLowerCase();
    setSearchInput(input);

    const newFilteredColors = colors.filter(
      (color) =>
        color.name.toLowerCase().includes(query) ||
        color.hex.toLowerCase().includes(query)
    );
    setFilteredColors(newFilteredColors);
  };

  const fetchColors = async () => {
    try {
      const colorsList = await getColors();
      setColors(colorsList);
      setFilteredColors(colorsList);
    } catch (error) {
      //TODO: Show Toast on error https://chakra-ui.com/docs/components/toast/usage
      console.log(error);
    }
  };

  return (
    <ColorsContext.Provider value={{ colors, fetchColors }}>
      <Header />
      <Flex
        justifyContent="space-around"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <AddColor setSearchInput={setSearchInput} />
        <SearchColors filterColors={filterColors} searchInput={searchInput} />
      </Flex>
      <Divider height="30px" marginBottom="30px" borderBottomWidth="5px" />
      <ColorsList colors={filteredColors} />
    </ColorsContext.Provider>
  );
};

export default Colors;
