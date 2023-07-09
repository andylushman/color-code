import { Heading, Flex } from '@chakra-ui/react';

const Header = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, green.200, pink.500)"
      height={40}
      marginBottom={5}
    >
      <Heading as="h1">Color Code</Heading>
    </Flex>
  );
};

export default Header;
