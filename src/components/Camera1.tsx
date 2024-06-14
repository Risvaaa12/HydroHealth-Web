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
  
  export default function Camera1() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <>
        <div className="flex flex-col justify-center w-full h-full sm:h-3/4">
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
            <Button onPress={onOpen} variant="faded" color="secondary" size="sm">
              Show Detail Camera
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
                  Live Camera 1
                </ModalHeader>
                <ModalBody className="w-full">
                  <>
                    <div className="flex flex-col grid-col-2 gap-2 sm:flex-row justify-center max-w-screen-xl">
                      <Card isFooterBlurred radius="lg" className="p-4 border-none">
                        <div className="relative overflow-hidden rounded-inherit rounded-large">
                          <Image
                            className="transform transition-transform-opacity object-cover"
                            alt="Next-Gen Hydroponics"
                            src={TeamPic.src}
                            width={700}
                            height={300}
                          />
                        </div>
                        {/* <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                          <p className="text-tiny text-white p-2 text-center">
                              Kamera 1
                          </p>
                        </CardFooter> */}
                      </Card>
                    </div>
                    <Button onPress={onOpen} variant="faded" color="secondary">
                        Classification
                    </Button>
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
  