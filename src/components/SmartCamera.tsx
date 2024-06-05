import {
  Image,
  Card,
  CardFooter,
  Button,
  Input,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import TeamPic from "@/assets/images/components/TeamPic.jpg";

export default function SmartCamera() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
      <div className="flex flex-col justify-center w-full h-full sm:h-4/5">
        <Card radius="lg" className="border-none">
        <div className="relative overflow-hidden rounded-inherit rounded-large">
          <Image
            className="transform transition-transform-opacity object-cover"
            alt="Next-Gen Hydroponics"
            src={TeamPic.src}
            width={700}
            height={300}
          />
        </div>
        <CardFooter className="justify-center overflow-hidden py-1 absolute  bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Button onPress={onOpen} variant="faded" color="secondary">
            Show Detail Camera
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
