import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Text
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import UpdateColorModal from './UpdateColorsModal';
import { deleteColor } from '../api';
import { useContext, useState } from 'react';
import { ColorsContext } from './Colors';

interface ColorsListItemProps {
  id: string;
  name: string;
  hex: string;
}

const ColorsListItem: React.FC<ColorsListItemProps> = ({ id, name, hex }) => {
  const { fetchColors } = useContext(ColorsContext);
  const [isCopied, setIsCopied] = useState(false);
  const removeColor = async (event: any) => {
    event.stopPropagation();
    try {
      await deleteColor(id);
      fetchColors();
    } catch (error) {
      //TODO: Show Toast on error https://chakra-ui.com/docs/components/toast/usage
      console.log(error);
    }
  };

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(hex);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <ListItem
      p={2}
      width={64}
      _hover={{
        background: 'gray.200'
      }}
      onClick={() => {
        handleCopyClick();
      }}
    >
      <Card textAlign="center">
        <CardHeader>
          <Heading size="md">{name}</Heading>
          <IconButton
            position="absolute"
            top={0}
            right={0}
            aria-label="Delete color"
            size="xs"
            icon={<CloseIcon />}
            onClick={(event) => removeColor(event)}
          />
        </CardHeader>
        <CardBody>
          <Flex
            backgroundColor={hex}
            height={24}
            width={24}
            margin="auto"
            flexDirection="column"
            justifyContent="center"
          >
            <span>{isCopied ? 'Copied!' : ''}</span>
          </Flex>
          <Text fontSize="sm">{hex}</Text>
        </CardBody>
        <UpdateColorModal name={name} id={id} hex={hex} />
      </Card>
    </ListItem>
  );
};

export default ColorsListItem;
