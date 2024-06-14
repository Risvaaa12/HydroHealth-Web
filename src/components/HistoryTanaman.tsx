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
  
  export default function HistoryTanaman() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <>
        <div className="flex flex-col justify-center w-full h-full sm:h-3/4">
          <Card radius="lg" className="border-none">
          <div className="relative overflow-hidden rounded-inherit rounded-large">
            <h1 className="font-bold text-center">History Tanaman</h1>
          </div>
          <CardFooter className="justify-center overflow-hidden py-1 absolute  bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <Button onPress={onOpen} variant="faded" color="secondary" size="sm">
              Show Detail 
            </Button>
          </CardFooter>
        </Card>
        </div>
        <Modal
            isOpen={isOpen}
            placement="center"
            backdrop="blur"
            onOpenChange={onOpenChange}
            size="2xl"
          >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  History Tanaman
                </ModalHeader>
                <ModalBody className="w-full">
                  <>
                    
                  </>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Tutup
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>    
    );
  }
  