import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useState, useContext, useEffect } from 'react';
import { ColorsContext } from './Colors';
import { updateColor } from '../api';
import { isValidHex } from './AddColor';

interface UpdateColorModalProps {
  id: string;
  name: string;
  hex: string;
}

const UpdateColorModal: React.FC<UpdateColorModalProps> = ({
  id,
  name,
  hex
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [color, setColor] = useState({ id, name, hex });
  const { fetchColors } = useContext(ColorsContext);

  useEffect(() => {
    setColor({ id, name, hex });
  }, [id, name, hex]);

  const modifyColor = async () => {
    try {
      await updateColor(color);
      onClose();
      fetchColors();
    } catch (error) {
      //TODO: Show Toast on error https://chakra-ui.com/docs/components/toast/usage
      console.log(error);
    }
  };

  return (
    <>
      <Button
        height={6}
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onOpen();
        }}
      >
        Update Color
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Color</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isRequired
              isInvalid={!isValidHex(color.hex) || !color.name}
            >
              <InputGroup size="md" marginBottom={2}>
                <InputLeftAddon width={20} children="name" />
                <Flex flexDirection="column">
                  <Input
                    type="text"
                    isInvalid={!color.name}
                    placeholder="Add a color"
                    aria-label="Add a color"
                    value={color.name}
                    onChange={(e) =>
                      setColor({ ...color, name: e.target.value })
                    }
                  />
                  {!color.name && (
                    <FormErrorMessage>
                      Please enter a name for the color.
                    </FormErrorMessage>
                  )}
                </Flex>
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon width={20} children="hex" />
                <Flex flexDirection="column">
                  <Input
                    type="text"
                    isInvalid={!isValidHex(color.hex)}
                    placeholder="Add a color"
                    aria-label="Add a color"
                    value={color.hex}
                    onChange={(e) =>
                      setColor({ ...color, hex: e.target.value })
                    }
                  />
                  {!isValidHex(color.hex) && (
                    <FormErrorMessage>
                      Please enter a valid hex code for the color.
                    </FormErrorMessage>
                  )}
                </Flex>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              height={6}
              size="sm"
              onClick={modifyColor}
              isDisabled={!isValidHex(color.hex) || !color.name}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateColorModal;
