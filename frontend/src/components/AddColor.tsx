import { Dispatch, SetStateAction, useContext, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup
} from '@chakra-ui/react';
import { ColorsContext } from './Colors';
import { createColor } from '../api';

export const isValidHex = (hex: string) => {
  return /^#[0-9A-F]{6}$/i.test(hex);
};

interface AddColorProps {
  setSearchInput: Dispatch<SetStateAction<string>>;
}

const AddColor: React.FC<AddColorProps> = ({ setSearchInput }) => {
  const { fetchColors } = useContext(ColorsContext);
  const [color, setColor] = useState({ name: '', hex: '' });
  const [isError, setIsError] = useState(false);

  const handleInput = (event: {
    target: { value: SetStateAction<string>; name: SetStateAction<string> };
  }) => {
    setColor({
      ...color,
      [event.target.name.toString()]: event.target.value as string
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (isValidHex(color.hex)) {
      try {
        const newColor = {
          id: Date.now().toString(),
          name: color.name,
          hex: color.hex
        };
        await createColor(newColor);
        fetchColors();
        setIsError(false);
        setColor({ name: '', hex: '' });
        setSearchInput('');
      } catch (error) {
        //TODO: Show Toast on error https://chakra-ui.com/docs/components/toast/usage
        console.log(error);
      }
    } else {
      setIsError(true);
    }
  };

  return (
    <Flex justifyContent="center">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired isInvalid={isError && !isValidHex(color.hex)}>
          <InputGroup size="md">
            <Flex flexDirection="column">
              <FormLabel alignSelf="center">Name</FormLabel>
              <Input
                name="name"
                type="text"
                placeholder="Add a color name"
                aria-label="Add a color name"
                onChange={handleInput}
                value={color.name}
              />
            </Flex>
            <Flex flexDirection="column">
              <FormLabel alignSelf="center">Hex</FormLabel>
              <Input
                name="hex"
                type="text"
                placeholder="Add a color hex"
                aria-label="Add a color hex"
                onChange={handleInput}
                value={color.hex}
              />
              {!isValidHex(color.hex) && (
                <FormErrorMessage>
                  Please enter a valid hex code for the color.
                </FormErrorMessage>
              )}
            </Flex>
          </InputGroup>
          <Flex justifyContent="center" marginTop={2}>
            <Button
              alignSelf="center"
              type="submit"
              onSubmit={(event) => handleSubmit(event)}
            >
              Add Color
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Flex>
  );
};

export default AddColor;
